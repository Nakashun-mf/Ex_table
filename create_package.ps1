# Chrome Web Store用のZIPパッケージを作成するPowerShellスクリプト
#
# 使い方: .\create_package.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Chrome Web Store パッケージ作成" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 設定
$outputDir = "package"
$zipName = "table-copy-extension.zip"

# 必要なファイルのリスト
$files = @(
    "manifest.json",
    "background.js",
    "content.js",
    "icon16.png",
    "icon48.png",
    "icon128.png",
    "README.md",
    "LICENSE"
)

# 既存のパッケージディレクトリとZIPを削除
if (Test-Path $outputDir) {
    Write-Host "既存のパッケージディレクトリを削除中..." -ForegroundColor Yellow
    Remove-Item -Path $outputDir -Recurse -Force
}

if (Test-Path $zipName) {
    Write-Host "既存のZIPファイルを削除中..." -ForegroundColor Yellow
    Remove-Item -Path $zipName -Force
}

# パッケージディレクトリを作成
Write-Host "パッケージディレクトリを作成中..." -ForegroundColor Green
New-Item -ItemType Directory -Path $outputDir | Out-Null

# ファイルをコピー
Write-Host "必要なファイルをコピー中..." -ForegroundColor Green
foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination $outputDir
        Write-Host "  ✓ $file" -ForegroundColor Gray
    } else {
        Write-Host "  ✗ $file (見つかりません)" -ForegroundColor Red
    }
}

# ZIPファイルを作成
Write-Host ""
Write-Host "ZIPファイルを作成中..." -ForegroundColor Green
Compress-Archive -Path "$outputDir\*" -DestinationPath $zipName -Force

# 結果を表示
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "パッケージ作成完了！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "作成されたファイル:" -ForegroundColor White
Write-Host "  📦 $zipName" -ForegroundColor Yellow
Write-Host ""

# ファイルサイズを表示
$zipSize = (Get-Item $zipName).Length
$zipSizeKB = [math]::Round($zipSize / 1KB, 2)
Write-Host "ZIPファイルサイズ: $zipSizeKB KB" -ForegroundColor Gray
Write-Host ""

Write-Host "次の手順:" -ForegroundColor White
Write-Host "1. https://chrome.google.com/webstore/devconsole にアクセス" -ForegroundColor Gray
Write-Host "2. 「新しいアイテム」をクリック" -ForegroundColor Gray
Write-Host "3. $zipName をアップロード" -ForegroundColor Gray
Write-Host "4. ストア掲載情報を入力（store_description.txt を参照）" -ForegroundColor Gray
Write-Host "5. スクリーンショットをアップロード" -ForegroundColor Gray
Write-Host "6. プライバシーポリシーURLを入力" -ForegroundColor Gray
Write-Host "7. レビューのために提出" -ForegroundColor Gray
Write-Host ""

# パッケージディレクトリを開く
Write-Host "エクスプローラーでパッケージフォルダを開きますか？ (Y/N)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq "Y" -or $response -eq "y") {
    Start-Process explorer $outputDir
}
