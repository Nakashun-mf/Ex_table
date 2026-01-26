"""
スクリーンショット自動撮影スクリプト

このスクリプトは、Seleniumを使用してChrome Web Store用の
スクリーンショットを自動的に撮影します。

必要なパッケージ:
    pip install selenium pillow

使い方:
    python take_screenshots.py
"""

import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from PIL import Image

def setup_driver():
    """Chrome WebDriverをセットアップ"""
    options = Options()
    options.add_argument('--force-device-scale-factor=1')
    options.add_argument('--window-size=1280,800')
    
    # 拡張機能を読み込む
    extension_path = os.path.abspath('.')
    options.add_argument(f'--load-extension={extension_path}')
    
    driver = webdriver.Chrome(options=options)
    return driver

def take_screenshot(driver, filename, description):
    """スクリーンショットを撮影して保存"""
    print(f"撮影中: {description}")
    time.sleep(1)  # 描画を待つ
    
    # screenshotsディレクトリを作成
    os.makedirs('screenshots', exist_ok=True)
    
    filepath = os.path.join('screenshots', filename)
    driver.save_screenshot(filepath)
    print(f"保存完了: {filepath}")
    
    # 画像をリサイズ（必要に応じて）
    img = Image.open(filepath)
    if img.size != (1280, 800):
        img_resized = img.resize((1280, 800), Image.Resampling.LANCZOS)
        img_resized.save(filepath)
        print(f"リサイズ完了: {img.size} -> (1280, 800)")

def main():
    """メイン処理"""
    print("=" * 50)
    print("スクリーンショット自動撮影開始")
    print("=" * 50)
    
    driver = None
    try:
        # WebDriverをセットアップ
        print("\n1. Chrome WebDriverを起動中...")
        driver = setup_driver()
        
        # デモページを開く
        print("\n2. デモページを開いています...")
        test_file = os.path.abspath('test_table.html')
        driver.get(f'file:///{test_file}')
        time.sleep(2)
        
        # スクリーンショット1: メインページ
        print("\n3. メインページのスクリーンショットを撮影...")
        take_screenshot(driver, 'screenshot_1_main.png', 'メインページ')
        
        # スクリーンショット2: テーブル部分（ズームイン）
        print("\n4. テーブル部分のクローズアップを撮影...")
        # ページをスクロール
        driver.execute_script("window.scrollTo(0, 400);")
        time.sleep(1)
        take_screenshot(driver, 'screenshot_2_table_detail.png', 'テーブル詳細')
        
        # スクリーンショット3: 結合セルのテーブル
        print("\n5. 結合セルのテーブルを撮影...")
        driver.execute_script("window.scrollTo(0, 1000);")
        time.sleep(1)
        take_screenshot(driver, 'screenshot_3_merged_cells.png', '結合セルテーブル')
        
        print("\n" + "=" * 50)
        print("撮影完了！")
        print("=" * 50)
        print("\n次のステップ:")
        print("1. screenshots/ フォルダ内の画像を確認")
        print("2. 手動で右クリックメニューのスクリーンショットを撮影")
        print("3. 手動でコピー成功通知のスクリーンショットを撮影")
        print("4. 手動でExcel貼り付け例のスクリーンショットを撮影")
        print("\n詳細は SCREENSHOT_GUIDE.md を参照してください。")
        
    except Exception as e:
        print(f"\nエラーが発生しました: {e}")
        print("\n手動でスクリーンショットを撮影してください。")
        print("詳細は SCREENSHOT_GUIDE.md を参照してください。")
    
    finally:
        if driver:
            print("\nブラウザを閉じます（5秒後）...")
            time.sleep(5)
            driver.quit()

if __name__ == '__main__':
    main()
