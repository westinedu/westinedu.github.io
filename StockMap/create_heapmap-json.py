import os
import json
import requests
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo  # Python 3.9+ 标准库

# --- 配置区 ---
API_KEY = os.getenv("POLYGON_API_KEY", "OSf7Cvnjc0r6bLzUBJIDocoeBVGPInA1")
DATA_DIR = "public/data"
OUT_DIR = DATA_DIR

# 文件名定义
RAW_AGGS_FILE = os.path.join(OUT_DIR, "aggs_{date}.json")
HEATMAP_FILES = {
    'DowJones30': os.path.join(OUT_DIR, 'DowJones30_heatmap.json'),
    'Nasdaq100': os.path.join(OUT_DIR, 'nasdaq100_heatmap.json'),
    'SP500': os.path.join(OUT_DIR, 'sp500_heatmap.json'),
}

# 指数列表 & 元数据文件
INDEX_CONFIG = {
    'DowJones30': {
        'list': os.path.join(DATA_DIR, 'DowJones30_list.json'),
        'meta': os.path.join(DATA_DIR, 'DowJones30_meta.json'),
    },
    'Nasdaq100': {
        'list': os.path.join(DATA_DIR, 'nasdaq100_list.json'),
        'meta': os.path.join(DATA_DIR, 'nasdaq100_meta.json'),
    },
    'SP500': {
        'list': os.path.join(DATA_DIR, 'sp500_list.json'),
        'meta': os.path.join(DATA_DIR, 'sp500_meta.json'),
    },
}

# API URL 模板
AGGS_URL = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/{date}?adjusted=false&apiKey={key}'


def is_business_day(d: date) -> bool:
    return d.weekday() < 5  # Mon-Fri


def get_prev_trade_date(day_str: str) -> str:
    # 输入 ISO 日期字符串，返回上一个交易日日期字符串
    d = datetime.fromisoformat(day_str).date()
    delta = timedelta(days=1)
    prev = d - delta
    while not is_business_day(prev):
        prev -= delta
    return prev.isoformat()


def fetch_all_aggs(day_str: str) -> dict:
    """拉取并保存指定日期的市场聚合数据，返回完整 JSON 数据"""
    url = AGGS_URL.format(date=day_str, key=API_KEY)
    resp = requests.get(url)
    resp.raise_for_status()
    full = resp.json()
    # 保存原始 JSON（含头部信息）
    os.makedirs(OUT_DIR, exist_ok=True)
    raw_path = RAW_AGGS_FILE.format(date=day_str)
    with open(raw_path, 'w', encoding='utf-8') as f:
        json.dump(full, f, ensure_ascii=False, indent=2)
    print(f"Saved raw aggs to {raw_path}")
    # 返回按 ticker 组织的映射
    results = full.get('results', [])
    return {item['T']: item for item in results}


def load_json(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def build_heatmap(index_name: str,
                  tickers: list,
                  meta_map: dict,
                  today_aggs: dict,
                  prev_aggs: dict,
                  out_path: str):
    """
    使用今日与前一交易日数据构建 heatmap。
    - value: 市值
    - colorValue: 今日 vs 前日的涨跌幅百分比
    """
    heat = []
    for t in tickers:
        today = today_aggs.get(t)
        prev = prev_aggs.get(t)
        if not today or not prev:
            continue
        # 计算市值: 优先使用 meta 中 market_cap，否则由股数 * 今日收盘
        m = meta_map.get(t, {})
        cap = None
        if cap is None:
            shares = m.get('share_class_shares_outstanding') or m.get('weighted_shares_outstanding', 0)
            cap = shares * today.get('c', 0)
        # 计算涨跌幅: (今日收盘 - 前日收盘) / 前日收盘
        c_today = today.get('c', 0)
        c_prev = prev.get('c', 0)
        change_pct = round((c_today - c_prev) / c_prev * 100, 2) if c_prev else 0
        heat.append({'name': t, 'value': cap, 'colorValue': change_pct})
    # 写 heatmap JSON
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(heat, f, ensure_ascii=False, indent=2)
    print(f"{index_name} heatmap ({len(heat)} items) saved to {out_path}")


def main():
    # 以美国东部时间为基准，先取“今天”，再回推到前一个交易日
    us_today = datetime.now(ZoneInfo("America/New_York")).date()
    # 从美国东部“今日”回退 1 天，作为初步候选
    cand = us_today - timedelta(days=1)

    # 如果候选不是美股交易日，则再往前找
    if not is_business_day(cand):
        cand = datetime.fromisoformat(get_prev_trade_date(us_today.isoformat())).date()
    today = cand.isoformat()
    prev_day = get_prev_trade_date(today)
    print(f"Fetching aggregate for {prev_day} and {today} (US Eastern based)...")
    # 拉取前一交易日和今日的聚合数据
    prev_aggs = fetch_all_aggs(prev_day)
    today_aggs = fetch_all_aggs(today)

    # 构建各指数 heatmap
    for idx, cfg in INDEX_CONFIG.items():
        tickers = load_json(cfg['list'])
        meta_map = load_json(cfg['meta'])
        out_path = HEATMAP_FILES[idx]
        build_heatmap(idx, tickers, meta_map, today_aggs, prev_aggs, out_path)

if __name__ == '__main__':
    main()

