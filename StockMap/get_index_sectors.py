import pandas as pd
import json
from pathlib import Path   # ✅ 用于创建文件路径

# 三大指数在 Wikipedia 上的 URL
INDEX_PAGES = {
    "DJ30":       "https://en.wikipedia.org/wiki/Dow_Jones_Industrial_Average",
    "SP500":      "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",
    "NASDAQ100":  "https://en.wikipedia.org/wiki/Nasdaq-100"
}

def extract_sector_table(df):
    """
    自动识别 Symbol/Ticker 列和 Sector/Industry 列，
    返回只含 {symbol, sector} 两列的新 DataFrame。
    """
    # 找到股票代码列
    sym_col = next(c for c in df.columns 
                   if str(c).lower() in ("symbol","ticker"))
    # 找到行业列：匹配 “sector” 或 “industry”
    sec_col = next(c for c in df.columns 
                   if "sector" in str(c).lower() or "industry" in str(c).lower())
    return df[[sym_col, sec_col]].rename(
        columns={sym_col: "symbol", sec_col: "sector"}
    )

# 用于收集所有指数 -> DataFrame 的结果
results = {}

for name, url in INDEX_PAGES.items():
    tables = pd.read_html(url)
    for df in tables:
        df.columns = df.columns.map(str)
        cols = [c.lower() for c in df.columns]
        if any(c in cols for c in ("symbol","ticker")) and \
           any("sector" in c or "industry" in c for c in cols):
            cleaned = extract_sector_table(df)
            cleaned = cleaned.drop_duplicates("symbol").reset_index(drop=True)
            results[name] = cleaned
            break
    else:
        raise RuntimeError(f"在 {url} 找不到带 Sector/Industry 的表格")

# 🔽 仅修改这里：分别输出三个 JSON 文件
out_dir = Path(".")              # 或者改成你想要的输出目录
for idx, df in results.items():
    file_path = out_dir / f"{idx}_sectors.json"
    df.to_json(file_path, orient="records", force_ascii=False, indent=2)
    print(f"已生成 {file_path.name}（{len(df)} 条）")

