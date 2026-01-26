#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
アイコン生成スクリプト
テーブルコピー拡張機能用のアイコンを生成します
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """指定されたサイズのアイコンを作成"""
    # 画像を作成（透明背景）
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 背景色（青系のグラデーション）
    bg_color = (66, 133, 244, 255)  # Google Blue
    draw.rectangle([0, 0, size, size], fill=bg_color)
    
    # テーブルグリッドを描画
    grid_color = (255, 255, 255, 255)  # 白
    line_width = max(1, size // 16)
    
    # グリッドのセル数（サイズに応じて調整）
    if size <= 16:
        rows, cols = 3, 3
    elif size <= 48:
        rows, cols = 4, 4
    else:
        rows, cols = 5, 5
    
    cell_width = size / cols
    cell_height = size / rows
    
    # 縦線
    for i in range(1, cols):
        x = int(i * cell_width)
        draw.line([(x, 0), (x, size)], fill=grid_color, width=line_width)
    
    # 横線
    for i in range(1, rows):
        y = int(i * cell_height)
        draw.line([(0, y), (size, y)], fill=grid_color, width=line_width)
    
    # コピーアイコン（右下に小さな矢印）
    arrow_size = size // 4
    arrow_x = size - arrow_size - line_width
    arrow_y = size - arrow_size - line_width
    
    # 矢印の三角形を描画
    arrow_points = [
        (arrow_x, arrow_y),
        (arrow_x + arrow_size, arrow_y),
        (arrow_x + arrow_size // 2, arrow_y + arrow_size)
    ]
    draw.polygon(arrow_points, fill=grid_color)
    
    # 保存
    img.save(filename, 'PNG')
    print(f"[OK] {filename} ({size}x{size}) を作成しました")

def main():
    """メイン処理"""
    print("アイコンを生成しています...")
    
    # 各サイズのアイコンを作成
    create_icon(16, 'icon16.png')
    create_icon(48, 'icon48.png')
    create_icon(128, 'icon128.png')
    
    print("\nすべてのアイコンの生成が完了しました！")

if __name__ == '__main__':
    main()
