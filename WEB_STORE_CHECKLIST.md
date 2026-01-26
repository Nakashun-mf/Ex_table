# Chrome Web Store 公開チェックリスト

このチェックリストを使用して、拡張機能をChrome Web Storeに公開する準備が整っているか確認してください。

## ✅ 必須項目

### 1. アカウント登録
- [ ] Chrome Web Store Developer アカウントを作成
- [ ] 登録料 $5 を支払い
- [ ] 開発者ダッシュボードにアクセス可能

### 2. 拡張機能ファイル
- [x] manifest.json が正しく設定されている
- [x] すべてのファイルが正常に動作する
- [x] アイコン（16x16, 48x48, 128x128）が用意されている
- [x] バージョン番号が設定されている（現在: v2.0.2）

### 3. 必須ドキュメント
- [x] LICENSE ファイル（MIT）
- [x] README.md（日本語）
- [x] privacy_policy.md（日本語・英語）
- [x] プライバシーポリシーの公開URL（要設定）

### 4. スクリーンショット
- [ ] 最低1枚のスクリーンショット（1280x800px推奨）
- [ ] 拡張機能の主要機能を示す画像
- [ ] 見やすく、分かりやすい構図

### 5. ストア掲載情報
- [x] 拡張機能名（日本語・英語）
- [x] 短い説明（132文字以内）
- [x] 詳細な説明
- [x] カテゴリ（生産性向上）
- [x] キーワード

## 📋 公開前の確認事項

### コードレビュー
- [x] コードに個人情報やAPIキーが含まれていない
- [x] console.log などのデバッグコードを削除または最小化
- [x] エラーハンドリングが適切に実装されている
- [x] セキュリティ上の問題がない

### 機能テスト
- [ ] 複数のWebサイトでテスト
- [ ] 基本的なテーブルのコピー
- [ ] 結合セル（rowspan/colspan）のコピー
- [ ] ネストされたテーブルの処理
- [ ] エラーケースの処理

### ブラウザ互換性
- [ ] Google Chrome（最新版）
- [ ] Microsoft Edge（最新版）
- [ ] その他Chromiumベースのブラウザ

### パフォーマンス
- [ ] メモリリークがない
- [ ] 不要なバックグラウンド処理がない
- [ ] ページ読み込み速度に影響を与えない

## 📦 ZIPパッケージの作成

以下のファイルをZIPに含める：
- [x] manifest.json
- [x] background.js
- [x] content.js
- [x] icon16.png
- [x] icon48.png
- [x] icon128.png
- [x] README.md
- [x] LICENSE

以下のファイルは除外する：
- [ ] .git/
- [ ] .gitignore
- [ ] test_table.html（デモ用）
- [ ] create_icons.py（開発用）
- [ ] take_screenshots.py（開発用）
- [ ] README_DEV.md（開発者用）
- [ ] SCREENSHOT_GUIDE.md（ガイド）
- [ ] WEB_STORE_CHECKLIST.md（このファイル）
- [ ] screenshots/（スクリーンショットは別途アップロード）

## 🌐 プライバシーポリシーの公開

プライバシーポリシーを公開するには、以下のいずれかの方法を選択：

### オプション1: GitHub Pages（推奨）
1. GitHubリポジトリの Settings > Pages に移動
2. Source を "main branch" に設定
3. `privacy_policy.md` を `privacy_policy.html` に変換
4. URL: `https://your-username.github.io/Ex_table/privacy_policy.html`

### オプション2: GitHub上のファイル直リンク
1. `privacy_policy.md` をGitHubにプッシュ
2. ファイルを開いて "Raw" をクリック
3. URL: `https://raw.githubusercontent.com/your-username/Ex_table/master/privacy_policy.md`

### オプション3: 独自のWebサイト
1. privacy_policy.md の内容をHTMLに変換
2. 自分のWebサイトにアップロード
3. URLをChrome Web Storeに登録

## 📤 アップロード手順

1. **ZIPファイルを作成**
   ```bash
   # 必要なファイルのみをZIPに含める
   # Windowsエクスプローラーで選択して「送る」>「圧縮(ZIP形式)フォルダー」
   ```

2. **Chrome Web Store Developer Dashboard にアクセス**
   - https://chrome.google.com/webstore/devconsole

3. **新しいアイテムを作成**
   - "新しいアイテム" をクリック
   - ZIPファイルをアップロード

4. **ストア掲載情報を入力**
   - `store_description.txt` の内容を参照
   - 拡張機能名、説明、カテゴリなどを入力

5. **スクリーンショットをアップロード**
   - screenshots/ フォルダから選択

6. **プライバシーポリシーURLを入力**

7. **レビューのために提出**
   - "レビューのために提出" ボタンをクリック

## ⏱️ レビュー期間

- 通常: 1-3営業日
- 初回の場合: 1週間程度かかることもある
- 問題がある場合: 追加情報を求められる

## 🔄 アップデート手順

バージョンアップ時：
1. manifest.json のバージョン番号を更新
2. README.md の変更履歴を更新
3. 新しいZIPファイルを作成
4. Developer Dashboard からアップロード
5. 変更内容を説明

## ⚠️ よくある却下理由

- 権限の理由が不明確
- プライバシーポリシーが不十分
- スクリーンショットが不適切
- コードに問題がある（セキュリティ、パフォーマンス）
- 説明が不十分または誤解を招く

## 📞 サポート

問題が発生した場合：
- Chrome Web Store ヘルプセンター: https://support.google.com/chrome_webstore/
- 開発者フォーラム: https://groups.google.com/a/chromium.org/g/chromium-extensions

## 🎉 公開後

- [ ] 公開URLを README.md に追加
- [ ] GitHubリポジトリに公開URLを記載
- [ ] 必要に応じてSNSなどで告知
- [ ] ユーザーからのフィードバックを収集
- [ ] レビューや評価に返信
