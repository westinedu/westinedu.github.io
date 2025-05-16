#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
集成 yfinance 实时抓取 + Heatmap JSON 生成脚本
1. 从 public/data/market_list.json 读取 symbol 列表
2. 使用 yfinance 批量获取实时行情快照
3. 计算市值和 colorValue
4. 为三大指数输出 Heatmap JSON
5. 生成完成后，将 stock_realtime.json 重命名为带时间戳的 3index_realtime 文件
"""
import os
import json
import time
from datetime import datetime
import yfinance as yf

# —— 配置区 —— #
DATA_DIR       = 'public/data'
TICKER_FILE    = os.path.join(DATA_DIR, 'market_list.json')  # 合并且去重后的 symbol 列表
INDEX_CONFIG = {
    'DowJones30': { 'list': os.path.join(DATA_DIR, 'DowJones30_list.json'), 'meta': os.path.join(DATA_DIR, 'DowJones30_meta.json') },
    'Nasdaq100':  { 'list': os.path.join(DATA_DIR, 'nasdaq100_list.json'),  'meta': os.path.join(DATA_DIR, 'nasdaq100_meta.json') },
    'SP500':      { 'list': os.path.join(DATA_DIR, 'sp500_list.json'),      'meta': os.path.join(DATA_DIR, 'sp500_meta.json') },
}
BATCH_SIZE    = 50
SLEEP_SECONDS = 1

# 中间存储实时抓取结果
REALTIME_FILE = os.path.join(DATA_DIR, '3index_realtime.json')


def log(msg: str):
    print(f"{datetime.now():%Y-%m-%d %H:%M:%S} – {msg}")


def load_json(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path: str, data) -> None:
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)





def fetch_real_time(tickers: list) -> dict:
    """
    批量抓取实时行情，结果写入 REALTIME_FILE，返回 {symbol: {...}}。
    """
    results = load_json(REALTIME_FILE).get('data', {}) if os.path.exists(REALTIME_FILE) else {}
    all_symbols = [t for t in tickers if t not in results]
    total = len(all_symbols)
    log(f"需抓取 {total}/{len(tickers)} 支新行情")

    for i in range(0, total, BATCH_SIZE):
        batch = all_symbols[i:i+BATCH_SIZE]
        log(f"批次 {i+1}-{i+len(batch)}: 抓取 {len(batch)} 支")
        ticker_str = ' '.join(batch)
        ts = yf.Tickers(ticker_str)
        if hasattr(ts, 'quotes'):
            snap = ts.quotes or {}
        else:
            snap = {}
            for sym in batch:
                tk = yf.Ticker(sym)
                snap[sym] = tk.info or {}

        for sym, info in snap.items():
            price = info.get('regularMarketPrice') or info.get('currentPrice')
            change_pct = info.get('regularMarketChangePercent')
            volume = info.get('regularMarketVolume') or info.get('volume')
            timestamp = info.get('regularMarketTime') or int(time.time())
            results[sym] = {'price': price, 'changePct': change_pct, 'volume': volume, 'time': timestamp}

        save_json(REALTIME_FILE, {'fetched_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'data': results})
        log(f"已保存 {len(results)} 支行情至 {REALTIME_FILE}")
        time.sleep(SLEEP_SECONDS)

    return results


def build_heatmap(index_name: str, tickers: list, meta_map: dict, realtime: dict) -> None:
    """
    使用实时行情和元数据生成 Heatmap JSON 文件。
    """
    heat = []
    for sym in tickers:
        rt = realtime.get(sym)
        m = meta_map.get(sym, {})
        if not rt or not m:
            continue
        price = rt.get('price') or 0
        change_pct = rt.get('changePct') or 0
        shares = m.get('share_class_shares_outstanding') or m.get('weighted_shares_outstanding') or 0
        market_cap = shares * price
        corp_name = m.get('name') or sym
        heat.append({'name': sym, 'value': market_cap, 'colorValue': change_pct, 'corpName': corp_name, 'price': price})

    out_path = os.path.join(DATA_DIR, f"{index_name}_heatmap.json")
    save_json(out_path, heat)
    log(f"{index_name} heatmap 完成，包含 {len(heat)} 项，文件：{out_path}")


def main():
    # 1. 加载 symbol 列表
    tickers = load_json(TICKER_FILE)
    # 2. 抓取并保存实时行情
    realtime = fetch_real_time(tickers)
    # 3. 生成各指数 Heatmap
    for idx, cfg in INDEX_CONFIG.items():
        tickers_idx = load_json(cfg['list'])
        raw_meta = load_json(cfg['meta'])
        # 元数据文件可能是 dict 或 list
        if isinstance(raw_meta, dict):
            meta_map = raw_meta
        elif isinstance(raw_meta, list):
            meta_map = {item['ticker']: item for item in raw_meta}
        else:
            meta_map = {}

        build_heatmap(idx, tickers_idx, meta_map, realtime)

    log("全部 Heatmap 生成完成。")

    # 4. 重命名 stock_realtime.json 为带时间戳的 3index_realtime 文件
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    new_name = os.path.join(DATA_DIR, f'3index_realtime_{timestamp}.json')
    os.rename(REALTIME_FILE, new_name)
    log(f"重命名实时行情文件为：{new_name}")

if __name__ == '__main__':
    main()
