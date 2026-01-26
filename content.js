// content.js - コンテンツスクリプト

(function() {
  'use strict';

  // 最後に右クリックされた要素を記録
  let lastRightClickedElement = null;

  // 右クリックイベントをキャプチャ
  document.addEventListener('contextmenu', (event) => {
    lastRightClickedElement = event.target;
  }, true);

  // バックグラウンドスクリプトからのメッセージを受信
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "copyTable") {
      // 非同期処理を実行
      copyTable()
        .then((result) => {
          sendResponse({ success: result.success, message: result.message });
        })
        .catch((error) => {
          console.error('テーブルコピーエラー:', error);
          sendResponse({ success: false, message: `エラー: ${error.message}` });
        });
      return true; // 非同期レスポンスを許可
    }
  });

  /**
   * テーブルをコピーする
   */
  async function copyTable() {
    // 最後に右クリックされた要素から、最も近いテーブルを探す
    const table = findClosestTable(lastRightClickedElement);
    
    if (!table) {
      showNotification('テーブルが見つかりません', false);
      return { success: false, message: 'テーブルが見つかりません' };
    }

    // テーブルをTSV形式に変換
    const tsvData = convertTableToTSV(table);
    
    if (!tsvData) {
      showNotification('テーブルデータの取得に失敗しました', false);
      return { success: false, message: 'テーブルデータの取得に失敗しました' };
    }

    // クリップボードにコピー
    return await copyToClipboard(tsvData);
  }

  /**
   * 最も近いテーブル要素を見つける
   */
  function findClosestTable(element) {
    if (!element) return null;

    // 要素自身がテーブルの場合
    if (element.tagName === 'TABLE') {
      return element;
    }

    // 親要素を辿ってテーブルを探す
    let current = element;
    while (current && current !== document.body) {
      if (current.tagName === 'TABLE') {
        return current;
      }
      current = current.parentElement;
    }

    return null;
  }

  /**
   * テーブルをTSV形式に変換
   */
  function convertTableToTSV(table) {
    const rows = table.rows;
    if (!rows || rows.length === 0) {
      return null;
    }

    // 結合セルを処理するためのマトリックスを作成
    const matrix = [];
    
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      let colIndex = 0;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        const rowspan = cell.rowSpan || 1;
        const colspan = cell.colSpan || 1;
        const cellText = getCellText(cell);

        // 既に埋まっているセルをスキップ
        while (matrix[i] && matrix[i][colIndex]) {
          colIndex++;
        }

        // セルの内容を配置
        for (let r = 0; r < rowspan; r++) {
          if (!matrix[i + r]) {
            matrix[i + r] = [];
          }
          for (let c = 0; c < colspan; c++) {
            matrix[i + r][colIndex + c] = cellText;
          }
        }

        colIndex += colspan;
      }
    }

    // マトリックスをTSV形式に変換
    return matrix.map(row => row.join('\t')).join('\n');
  }

  /**
   * セルのテキストを取得（ネストされたテーブルを除外）
   */
  function getCellText(cell) {
    // セル内のすべてのテキストノードを取得
    const textNodes = [];
    
    function collectTextNodes(node) {
      // ネストされたテーブルは無視
      if (node.tagName === 'TABLE') {
        return;
      }
      
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          textNodes.push(text);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const child of node.childNodes) {
          collectTextNodes(child);
        }
      }
    }
    
    collectTextNodes(cell);
    return textNodes.join(' ').trim();
  }

  /**
   * クリップボードにコピー
   */
  async function copyToClipboard(text) {
    // 方法1: Clipboard API（推奨）
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showNotification('テーブルをコピーしました', true);
        return { success: true, message: 'テーブルをコピーしました' };
      } catch (error) {
        console.error('Clipboard API エラー:', error);
        // Clipboard APIが失敗した場合、フォールバック
        return await fallbackCopyToClipboard(text);
      }
    } else {
      // Clipboard APIが利用できない場合、フォールバック
      return await fallbackCopyToClipboard(text);
    }
  }

  /**
   * フォールバック：execCommand を使用してクリップボードにコピー
   */
  async function fallbackCopyToClipboard(text) {
    return new Promise((resolve) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (successful) {
          showNotification('テーブルをコピーしました', true);
          resolve({ success: true, message: 'テーブルをコピーしました' });
        } else {
          showNotification('コピーに失敗しました', false);
          resolve({ success: false, message: 'コピーに失敗しました' });
        }
      } catch (error) {
        document.body.removeChild(textarea);
        console.error('execCommand エラー:', error);
        showNotification('コピーに失敗しました', false);
        resolve({ success: false, message: `コピーに失敗しました: ${error.message}` });
      }
    });
  }

  /**
   * 通知を表示
   */
  function showNotification(message, isSuccess) {
    // 既存の通知を削除
    const existingNotification = document.getElementById('tableCopyExtension_notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // 通知要素を作成
    const notification = document.createElement('div');
    notification.id = 'tableCopyExtension_notification';
    notification.textContent = message;
    
    // スタイルを設定
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      backgroundColor: isSuccess ? '#4CAF50' : '#f44336',
      color: 'white',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: '2147483647',
      fontSize: '14px',
      fontFamily: 'sans-serif',
      animation: 'tableCopyFadeIn 0.3s ease-in-out'
    });

    // アニメーションのスタイルを追加
    if (!document.getElementById('tableCopyExtension_styles')) {
      const style = document.createElement('style');
      style.id = 'tableCopyExtension_styles';
      style.textContent = `
        @keyframes tableCopyFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes tableCopyFadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // 3秒後に通知を削除
    setTimeout(() => {
      notification.style.animation = 'tableCopyFadeOut 0.3s ease-in-out';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

})();
