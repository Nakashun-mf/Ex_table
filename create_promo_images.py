"""
プロモーション画像自動生成スクリプト

このスクリプトは、promo_image_template.htmlを使用して
Chrome Web Store用のプロモーション画像を自動的に生成します。

必要なパッケージ:
    pip install selenium pillow

使い方:
    python create_promo_images.py
"""

import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from PIL import Image
import base64

def setup_driver():
    """Chrome WebDriverをセットアップ"""
    options = Options()
    options.add_argument('--headless')  # ヘッドレスモード
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--force-device-scale-factor=1')
    options.add_argument('--window-size=1600,1200')
    
    try:
        driver = webdriver.Chrome(options=options)
        return driver
    except Exception as e:
        print(f"Chrome WebDriverの起動に失敗しました: {e}")
        print("\n手動でプロモーション画像を作成する方法:")
        print("1. promo_image_template.html をブラウザで開く")
        print("2. 各プロモーション画像の上で右クリック → スクリーンショットを撮影")
        print("3. 画像編集ソフトで指定サイズにトリミング")
        raise

def take_element_screenshot(driver, element, filename, target_size):
    """特定の要素のスクリーンショットを撮影してリサイズ"""
    print(f"撮影中: {filename} ({target_size[0]}x{target_size[1]}px)")
    
    # プロモーション画像ディレクトリを作成
    os.makedirs('promo_images', exist_ok=True)
    filepath = os.path.join('promo_images', filename)
    
    # 要素のスクリーンショットを取得
    time.sleep(0.5)  # 描画を待つ
    
    # 要素の位置とサイズを取得
    location = element.location
    size = element.size
    
    # ページ全体のスクリーンショットを取得
    driver.save_screenshot('temp_screenshot.png')
    
    # 要素部分を切り出し
    img = Image.open('temp_screenshot.png')
    left = location['x']
    top = location['y']
    right = left + size['width']
    bottom = top + size['height']
    
    # 要素を切り出し
    element_img = img.crop((left, top, right, bottom))
    
    # 指定サイズにリサイズ
    if element_img.size != target_size:
        element_img = element_img.resize(target_size, Image.Resampling.LANCZOS)
    
    # 保存
    element_img.save(filepath, 'PNG', optimize=True)
    print(f"保存完了: {filepath}")
    
    # 一時ファイルを削除
    if os.path.exists('temp_screenshot.png'):
        os.remove('temp_screenshot.png')

def main():
    """メイン処理"""
    print("=" * 60)
    print("プロモーション画像自動生成スクリプト")
    print("=" * 60)
    
    driver = None
    try:
        # WebDriverをセットアップ
        print("\n1. Chrome WebDriverを起動中...")
        driver = setup_driver()
        
        # HTMLファイルのパスを取得
        html_file = os.path.abspath('promo_image_template.html')
        file_url = f'file:///{html_file.replace(os.sep, "/")}'
        
        print(f"\n2. HTMLテンプレートを読み込み中: {file_url}")
        driver.get(file_url)
        time.sleep(2)  # ページの読み込みを待つ
        
        # Small Promo Tile (440x280px)
        print("\n3. Small Promo Tile を生成中...")
        try:
            small_promo = driver.find_element(By.ID, 'small-promo')
            take_element_screenshot(
                driver, 
                small_promo, 
                'small_promo_tile_440x280.png',
                (440, 280)
            )
        except Exception as e:
            print(f"エラー: Small Promo Tile の生成に失敗しました: {e}")
        
        # Large Promo Tile (920x680px)
        print("\n4. Large Promo Tile を生成中...")
        try:
            large_promo = driver.find_element(By.ID, 'large-promo')
            take_element_screenshot(
                driver, 
                large_promo, 
                'large_promo_tile_920x680.png',
                (920, 680)
            )
        except Exception as e:
            print(f"エラー: Large Promo Tile の生成に失敗しました: {e}")
        
        # Marquee Promo Tile (1400x560px)
        print("\n5. Marquee Promo Tile を生成中...")
        try:
            marquee_promo = driver.find_element(By.ID, 'marquee-promo')
            take_element_screenshot(
                driver, 
                marquee_promo, 
                'marquee_promo_tile_1400x560.png',
                (1400, 560)
            )
        except Exception as e:
            print(f"エラー: Marquee Promo Tile の生成に失敗しました: {e}")
        
        print("\n" + "=" * 60)
        print("プロモーション画像の生成が完了しました！")
        print("=" * 60)
        print("\n生成された画像:")
        print("  - promo_images/small_promo_tile_440x280.png")
        print("  - promo_images/large_promo_tile_920x680.png")
        print("  - promo_images/marquee_promo_tile_1400x560.png")
        print("\n次のステップ:")
        print("1. promo_images/ フォルダ内の画像を確認")
        print("2. 必要に応じて画像編集ソフトで微調整")
        print("3. Chrome Web Store Developer Dashboardにアップロード")
        
    except Exception as e:
        print(f"\nエラーが発生しました: {e}")
        print("\n手動でプロモーション画像を作成する方法:")
        print("1. promo_image_template.html をブラウザで開く")
        print("2. 各プロモーション画像の上で右クリック → スクリーンショットを撮影")
        print("3. 画像編集ソフトで指定サイズにトリミング")
        print("   - Small Promo Tile: 440x280px")
        print("   - Large Promo Tile: 920x680px")
        print("   - Marquee Promo Tile: 1400x560px")
    
    finally:
        if driver:
            print("\nブラウザを閉じます...")
            driver.quit()

if __name__ == '__main__':
    main()
