# プライバシーポリシー - テーブルコピー拡張機能

最終更新日: 2026年1月26日

## データの収集について

この拡張機能は、**いかなるユーザーデータも収集、保存、送信しません**。

## 権限の使用目的

この拡張機能は以下の権限を使用しますが、すべてローカルで処理され、外部に送信されることはありません：

### 1. contextMenus（コンテキストメニュー）
- **目的**: 右クリックメニューに「テーブルをコピーする」オプションを追加するために使用します
- **データの扱い**: この権限はメニュー項目の表示にのみ使用され、データの収集や送信には使用されません

### 2. activeTab（アクティブタブ）
- **目的**: 現在開いているタブのテーブル要素にアクセスし、テキストを抽出するために使用します
- **データの扱い**: テーブルのテキストデータは一時的にメモリに保持され、クリップボードにコピーされた後は破棄されます。外部への送信や永続的な保存は行いません

### 3. clipboardWrite（クリップボード書き込み）
- **目的**: 抽出したテーブルデータをユーザーのクリップボードに書き込むために使用します
- **データの扱い**: クリップボードにコピーされたデータは、ユーザーのデバイス内でのみ処理され、外部に送信されることはありません

### 4. host_permissions: <all_urls>（全URLへのアクセス）
- **目的**: あらゆるWebページ上のテーブルをコピーできるようにするために必要です
- **データの扱い**: この権限はページ上のテーブル要素へのアクセスにのみ使用されます。閲覧履歴、個人情報、その他のページコンテンツにはアクセスしません

## データの保存と送信

- **ローカル処理のみ**: すべてのデータ処理はユーザーのブラウザ内で完結します
- **外部送信なし**: いかなるデータも外部サーバーやサードパーティに送信されません
- **保存なし**: テーブルデータは一時的にメモリに保持されるのみで、永続的な保存は行いません
- **トラッキングなし**: ユーザーの行動追跡、分析、統計収集は一切行いません

## サードパーティサービス

この拡張機能は、サードパーティのサービスやライブラリを使用していません。すべての機能は自己完結型です。

## クッキー

この拡張機能はクッキーを使用しません。

## お問い合わせ

プライバシーに関するご質問やご懸念がある場合は、GitHubリポジトリのIssuesセクションからお問い合わせください。

---

# Privacy Policy - Table Copy Extension

Last Updated: January 26, 2026

## Data Collection

This extension **does not collect, store, or transmit any user data whatsoever**.

## Permission Usage

This extension uses the following permissions, but all processing is done locally and no data is sent externally:

### 1. contextMenus
- **Purpose**: Used to add a "Copy Table" option to the right-click context menu
- **Data Handling**: This permission is only used to display menu items and is not used for data collection or transmission

### 2. activeTab
- **Purpose**: Used to access table elements on the currently open tab and extract text
- **Data Handling**: Table text data is temporarily held in memory and discarded after being copied to the clipboard. No external transmission or persistent storage occurs

### 3. clipboardWrite
- **Purpose**: Used to write extracted table data to the user's clipboard
- **Data Handling**: Data copied to the clipboard is only processed within the user's device and is never sent externally

### 4. host_permissions: <all_urls>
- **Purpose**: Required to enable table copying on any webpage
- **Data Handling**: This permission is only used to access table elements on pages. It does not access browsing history, personal information, or other page content

## Data Storage and Transmission

- **Local Processing Only**: All data processing is completed within the user's browser
- **No External Transmission**: No data is sent to external servers or third parties
- **No Storage**: Table data is only temporarily held in memory and is not persistently stored
- **No Tracking**: No user behavior tracking, analytics, or statistics collection is performed

## Third-Party Services

This extension does not use any third-party services or libraries. All functionality is self-contained.

## Cookies

This extension does not use cookies.

## Contact

If you have any questions or concerns about privacy, please contact us through the Issues section of our GitHub repository.
