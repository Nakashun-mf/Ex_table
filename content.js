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
    const handlers = {
      copyTable: () => copyTable(),
      copyRow: () => copyRow(),
      copyColumn: () => copyColumn()
    };
    const handler = handlers[message.action];
    if (handler) {
      handler()
        .then((result) => {
          sendResponse({ success: result.success, message: result.message });
        })
        .catch((error) => {
          console.error('コピーエラー:', error);
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
    return await copyToClipboard(tsvData, 'テーブルをコピーしました');
  }

  /**
   * クリックした行をコピーする
   */
  async function copyRow() {
    const row = findClosestRow(lastRightClickedElement);
    if (!row) {
      showNotification('行が見つかりません', false);
      return { success: false, message: '行が見つかりません' };
    }

    const cells = Array.from(row.cells);
    const tsvData = cells.map(cell => getCellText(cell)).join('\t');

    if (!tsvData) {
      showNotification('行データの取得に失敗しました', false);
      return { success: false, message: '行データの取得に失敗しました' };
    }

    return await copyToClipboard(tsvData, 'この行をコピーしました');
  }

  /**
   * クリックした列をコピーする
   */
  async function copyColumn() {
    const cell = findClosestCell(lastRightClickedElement);
    if (!cell) {
      showNotification('列が見つかりません', false);
      return { success: false, message: '列が見つかりません' };
    }

    const table = findClosestTable(lastRightClickedElement);
    if (!table) {
      showNotification('テーブルが見つかりません', false);
      return { success: false, message: 'テーブルが見つかりません' };
    }

    // クリックしたセルの視覚的な列インデックスを求める
    const colIndex = getVisualColumnIndex(table, cell);
    if (colIndex === -1) {
      showNotification('列インデックスの取得に失敗しました', false);
      return { success: false, message: '列インデックスの取得に失敗しました' };
    }

    // 各行からその列のセルテキストを取得
    const matrix = buildMatrix(table);
    const columnData = matrix.map(row => row[colIndex] ?? '');
    const tsvData = columnData.join('\n');

    if (!tsvData) {
      showNotification('列データの取得に失敗しました', false);
      return { success: false, message: '列データの取得に失敗しました' };
    }

    return await copyToClipboard(tsvData, 'この列をコピーしました');
  }

  /**
   * 最も近い行（TR）要素を見つける
   */
  function findClosestRow(element) {
    if (!element) return null;
    let current = element;
    while (current && current !== document.body) {
      if (current.tagName === 'TR') return current;
      current = current.parentElement;
    }
    return null;
  }

  /**
   * 最も近いセル（TD/TH）要素を見つける
   */
  function findClosestCell(element) {
    if (!element) return null;
    let current = element;
    while (current && current !== document.body) {
      if (current.tagName === 'TD' || current.tagName === 'TH') return current;
      current = current.parentElement;
    }
    return null;
  }

  /**
   * セルの視覚的な列インデックスをマトリックスから求める
   */
  function getVisualColumnIndex(table, targetCell) {
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      for (let j = 0; j < cells.length; j++) {
        if (cells[j] === targetCell) {
          // この行の前のセルのcolspanを合計して視覚列インデックスを求める
          let colIndex = 0;
          for (let k = 0; k < j; k++) {
            colIndex += cells[k].colSpan || 1;
          }
          return colIndex;
        }
      }
    }
    return -1;
  }

  /**
   * テーブル全体のマトリックスを構築（結合セル対応）
   */
  function buildMatrix(table) {
    const rows = table.rows;
    const matrix = [];

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      let colIndex = 0;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        const rowspan = cell.rowSpan || 1;
        const colspan = cell.colSpan || 1;
        const cellText = getCellText(cell);

        while (matrix[i] && matrix[i][colIndex] !== undefined) {
          colIndex++;
        }

        for (let r = 0; r < rowspan; r++) {
          if (!matrix[i + r]) matrix[i + r] = [];
          for (let c = 0; c < colspan; c++) {
            matrix[i + r][colIndex + c] = cellText;
          }
        }

        colIndex += colspan;
      }
    }

    return matrix;
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
    if (!table.rows || table.rows.length === 0) return null;
    const matrix = buildMatrix(table);
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
  async function copyToClipboard(text, successMessage = 'コピーしました') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showNotification(successMessage, true);
        return { success: true, message: successMessage };
      } catch (error) {
        console.error('Clipboard API エラー:', error);
        return await fallbackCopyToClipboard(text, successMessage);
      }
    } else {
      return await fallbackCopyToClipboard(text, successMessage);
    }
  }

  /**
   * フォールバック：execCommand を使用してクリップボードにコピー
   */
  async function fallbackCopyToClipboard(text, successMessage = 'コピーしました') {
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
          showNotification(successMessage, true);
          resolve({ success: true, message: successMessage });
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
