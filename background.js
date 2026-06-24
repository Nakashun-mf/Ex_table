// background.js - バックグラウンドサービスワーカー

// 右クリックメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTable",
    title: "テーブルをコピーする",
    contexts: ["page", "selection", "link", "image"],
    documentUrlPatterns: ["http://*/*", "https://*/*", "file:///*"]
  });
  chrome.contextMenus.create({
    id: "copyRow",
    title: "この行をコピーする",
    contexts: ["page", "selection", "link", "image"],
    documentUrlPatterns: ["http://*/*", "https://*/*", "file:///*"]
  });
  chrome.contextMenus.create({
    id: "copyColumn",
    title: "この列をコピーする",
    contexts: ["page", "selection", "link", "image"],
    documentUrlPatterns: ["http://*/*", "https://*/*", "file:///*"]
  });
});

// 右クリックメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const actionMap = {
    "copyTable": "copyTable",
    "copyRow": "copyRow",
    "copyColumn": "copyColumn"
  };
  const action = actionMap[info.menuItemId];
  if (action) {
    chrome.tabs.sendMessage(tab.id, { action }, (response) => {
      if (chrome.runtime.lastError) {
        console.log('メッセージ送信エラー:', chrome.runtime.lastError.message);
        return;
      }
      if (response && response.success) {
        console.log('コピー成功:', response.message);
      } else if (response) {
        console.log('コピー失敗:', response.message);
      }
    });
  }
});
