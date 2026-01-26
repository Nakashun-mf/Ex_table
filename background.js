// background.js - バックグラウンドサービスワーカー

// 右クリックメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTable",
    title: "テーブルをコピーする",
    contexts: ["page", "selection", "link", "image"],
    documentUrlPatterns: ["http://*/*", "https://*/*", "file:///*"]
  });
});

// 右クリックメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyTable") {
    // コンテンツスクリプトにメッセージを送信
    chrome.tabs.sendMessage(tab.id, { action: "copyTable" }, (response) => {
      // レスポンスの処理
      if (chrome.runtime.lastError) {
        // エラーが発生した場合（コンテンツスクリプトが読み込まれていない等）
        console.log('メッセージ送信エラー:', chrome.runtime.lastError.message);
        // エラーを無視（ユーザーには影響しない）
        return;
      }
      
      // 成功時のログ
      if (response && response.success) {
        console.log('テーブルコピー成功:', response.message);
      } else if (response) {
        console.log('テーブルコピー失敗:', response.message);
      }
    });
  }
});
