# 🎉 Chrome Web Store 公開準備完了！

この拡張機能をChrome Web Storeに公開する準備が整いました。

## ✅ 完了した準備

### 📄 必須ドキュメント
- ✅ **LICENSE** - MITライセンス
- ✅ **privacy_policy.md** - 日本語・英語のプライバシーポリシー
- ✅ **README.md** - ユーザー向けドキュメント（更新済み）
- ✅ **store_description.txt** - ストア掲載情報

### 🛠️ ツールとスクリプト
- ✅ **create_package.ps1** - ZIPパッケージ作成（PowerShell）
- ✅ **create_package.bat** - ZIPパッケージ作成（バッチファイル）
- ✅ **test_table.html** - スクリーンショット撮影用デモページ
- ✅ **take_screenshots.py** - スクリーンショット自動撮影（Python）
- ✅ **promo_image_template.html** - プロモーション画像テンプレート

### 📚 ガイドドキュメント
- ✅ **WEB_STORE_CHECKLIST.md** - 公開手順チェックリスト
- ✅ **SCREENSHOT_GUIDE.md** - スクリーンショット撮影ガイド
- ✅ **README_DEV.md** - 開発者向けドキュメント

### 🗂️ Gitコミット
- ✅ すべてのファイルがgitにコミット済み

---

## 📋 次のステップ（公開までの流れ）

### ステップ1: スクリーンショットを撮影 📸

**方法1: 手動撮影（推奨）**
1. `test_table.html` をChromeで開く
2. SCREENSHOT_GUIDE.md の手順に従って撮影
3. `screenshots/` フォルダに保存

**方法2: Python自動撮影**
```powershell
pip install selenium pillow
python take_screenshots.py
```

**最低1枚、推奨3-5枚のスクリーンショットが必要です。**

### ステップ2: プライバシーポリシーを公開 🌐

プライバシーポリシーをWeb上に公開する必要があります。

**オプション1: GitHub Pages（推奨）**
1. GitHubリポジトリの Settings > Pages
2. Source を "main" または "master" branch に設定
3. URL: `https://あなたのユーザー名.github.io/Ex_table/privacy_policy.html`

**オプション2: GitHub Raw URL**
1. privacy_policy.md をGitHubにプッシュ
2. ファイルを開いて "Raw" をクリック
3. URL: `https://raw.githubusercontent.com/あなたのユーザー名/Ex_table/master/privacy_policy.md`

### ステップ3: ZIPパッケージを作成 📦

PowerShellを開いて実行：
```powershell
.\create_package.ps1
```

または、バッチファイルをダブルクリック：
```
create_package.bat
```

これで `table-copy-extension.zip` が作成されます。

### ステップ4: Chrome Web Store Developer アカウント登録 💳

1. https://chrome.google.com/webstore/devconsole にアクセス
2. Googleアカウントでログイン
3. 開発者登録料 **$5** を支払い（一度のみ）
4. 開発者契約に同意

### ステップ5: 拡張機能をアップロード 📤

1. Developer Dashboard で「新しいアイテム」をクリック
2. `table-copy-extension.zip` をアップロード
3. アップロード完了を待つ

### ステップ6: ストア掲載情報を入力 📝

`store_description.txt` の内容を参考に以下を入力：

**基本情報**
- 拡張機能名: `テーブルコピー拡張機能`
- 短い説明: `Webページのテーブルを右クリックで簡単コピー。結合セル対応。Excelに直接貼り付け可能。`
- 詳細な説明: `store_description.txt` の「詳細な説明（日本語）」セクションをコピー

**カテゴリとキーワード**
- カテゴリ: 生産性向上（Productivity）
- キーワード: table copy, excel, spreadsheet, web scraping, productivity

**スクリーンショット**
- `screenshots/` フォルダから画像をアップロード
- 最低1枚、推奨3-5枚

**プライバシーポリシー**
- ステップ2で公開したURLを入力

**サポートURL**
- GitHubリポジトリのURL

### ステップ7: レビューのために提出 🚀

1. すべての項目を確認
2. 「下書きを保存」をクリック
3. 問題がなければ「レビューのために提出」をクリック

### ステップ8: レビュー待ち ⏳

- **通常**: 1-3営業日
- **初回**: 1週間程度かかることもある
- レビュー結果がメールで届きます

### ステップ9: 公開完了！ 🎊

- 承認されると自動的に公開されます
- Chrome Web StoreのURLをREADME.mdに追加
- 必要に応じてSNSなどで告知

---

## 📊 チェックリスト（提出前の最終確認）

- [ ] スクリーンショットを撮影した（最低1枚）
- [ ] プライバシーポリシーをWeb上に公開した
- [ ] ZIPパッケージを作成した（`table-copy-extension.zip`）
- [ ] Chrome Web Store Developer アカウントを登録した
- [ ] 拡張機能をアップロードした
- [ ] ストア掲載情報を入力した（日本語・英語）
- [ ] スクリーンショットをアップロードした
- [ ] プライバシーポリシーURLを入力した
- [ ] サポートURLを入力した
- [ ] すべての項目を確認した
- [ ] レビューのために提出した

---

## 🆘 トラブルシューティング

### ZIPアップロードエラー
- 不要なファイル（.git, node_modules など）が含まれていないか確認
- manifest.json が正しい形式か確認
- ファイルサイズが大きすぎないか確認

### レビュー却下
よくある却下理由：
- プライバシーポリシーが不十分
- 権限の理由が不明確
- スクリーンショットが不適切
- manifest.json にエラー

却下された場合は、指摘事項を修正して再提出してください。

### その他の問題
- [WEB_STORE_CHECKLIST.md](WEB_STORE_CHECKLIST.md) を参照
- Chrome Web Store ヘルプセンター: https://support.google.com/chrome_webstore/

---

## 🎓 補足情報

### プロモーション画像（任意）
より目立たせたい場合は、`promo_image_template.html` を使用してプロモーション画像を作成できます：
- Small Promo Tile: 440x280px
- Large Promo Tile: 920x680px
- Marquee Promo Tile: 1400x560px

### 多言語対応
英語版の説明も `store_description.txt` に含まれています。
グローバル展開したい場合は英語版も登録してください。

### アップデート
将来的にバージョンアップする場合：
1. manifest.json のバージョン番号を更新
2. README.md の変更履歴を更新
3. 新しいZIPを作成してアップロード

---

## 📞 サポート

質問や問題がある場合：
- WEB_STORE_CHECKLIST.md を参照
- Chrome Web Store ヘルプセンター
- 開発者フォーラム

---

**準備は整いました！頑張ってください！** 🚀
