@echo off
REM Chrome Web Store用のZIPパッケージを作成するスクリプト
REM 
REM 使い方: create_package.bat

echo ========================================
echo Chrome Web Store パッケージ作成
echo ========================================
echo.

REM 出力ディレクトリ
set OUTPUT_DIR=package
set ZIP_NAME=table-copy-extension.zip

REM 既存のパッケージディレクトリを削除
if exist %OUTPUT_DIR% (
    echo 既存のパッケージディレクトリを削除中...
    rmdir /s /q %OUTPUT_DIR%
)

REM パッケージディレクトリを作成
echo パッケージディレクトリを作成中...
mkdir %OUTPUT_DIR%

REM 必要なファイルをコピー
echo 必要なファイルをコピー中...
copy manifest.json %OUTPUT_DIR%\
copy background.js %OUTPUT_DIR%\
copy content.js %OUTPUT_DIR%\
copy icon16.png %OUTPUT_DIR%\
copy icon48.png %OUTPUT_DIR%\
copy icon128.png %OUTPUT_DIR%\
copy README.md %OUTPUT_DIR%\
copy LICENSE %OUTPUT_DIR%\

echo.
echo ========================================
echo コピー完了！
echo ========================================
echo.
echo 次の手順:
echo 1. %OUTPUT_DIR% フォルダを開く
echo 2. すべてのファイルを選択
echo 3. 右クリック ^> 送る ^> 圧縮(ZIP形式)フォルダー
echo 4. %ZIP_NAME% として保存
echo 5. Chrome Web Store Developer Dashboard にアップロード
echo.
echo または、PowerShellを使用:
echo    Compress-Archive -Path %OUTPUT_DIR%\* -DestinationPath %ZIP_NAME% -Force
echo.

REM パッケージディレクトリを開く
start explorer %OUTPUT_DIR%

pause
