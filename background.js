// background.js - バックグラウンドサービスワーカー

// 右クリックメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTable",
    title: "テーブルをコピーする",
    contexts: ["all"]
  });
});

// 右クリックメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyTable") {
    // コンテンツスクリプトにメッセージを送信
    chrome.tabs.sendMessage(tab.id, { action: "copyTable" });
  }
});
