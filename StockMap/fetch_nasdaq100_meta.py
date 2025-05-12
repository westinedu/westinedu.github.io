# build_meta_resume.py
import json, time, requests, os
from pathlib import Path

API_KEY = "OSf7Cvnjc0r6bLzUBJIDocoeBVGPInA1"
BASE    = Path("public/data")
BASE.mkdir(parents=True, exist_ok=True)

LIST_FILE  = BASE / "nasdaq100_list.json"        # 100 只代码的静态 JSON
META_FILE  = BASE / "nasdaq100_meta.json"        # 累积写入的元数据
PROG_FILE  = BASE / "_progress.json"             # 保存 last_index

URL_META   = "https://api.polygon.io/v3/reference/tickers/{t}?apiKey=" + API_KEY
RATE_SLEEP = 12      # 12 s 一次
BATCH_MAX  = 5       # 5 次之后多睡 60

# ---------- 读取起始位置 ----------
tickers = json.loads(LIST_FILE.read_text())
start   = 0
meta    = {}

if META_FILE.exists() and PROG_FILE.exists():
    start = json.loads(PROG_FILE.read_text())["last_index"]
    meta  = json.loads(META_FILE.read_text())
    print(f"▶ Resume mode — continue from index {start}")
else:
    print("▶ Fresh run")
    META_FILE.write_text("{}")      # 空文件占位
    PROG_FILE.write_text(json.dumps({"last_index": 0}))

# ---------- 主循环 ----------
for idx in range(start, len(tickers)):
    t = tickers[idx]
    try:
        res = requests.get(URL_META.format(t=t)).json()["results"]
        meta[t] = res                   # 累积
        # 实时写盘
        META_FILE.write_text(json.dumps(meta, indent=2))
        PROG_FILE.write_text(json.dumps({"last_index": idx+1}))

        cap  = res.get("market_cap")
        wso  = res.get("weighted_shares_outstanding")

        cap_str = f"{cap:.2e}" if cap else "—"
        wso_str = f"{wso:,}"  if wso else "—"

        print(f"[{idx+1:>3}/100] {t:<6} cap={cap_str:<12}  wso={wso_str}")
    except Exception as e:
        print(f"[{idx+1:>3}/100] {t}  ! error: {e}")

    # 限速：5 次后额外睡 60 秒
    if (idx+1-start) % BATCH_MAX == 0 and idx < len(tickers)-1:
        time.sleep(60)
    else:
        time.sleep(RATE_SLEEP)

# ---------- 结束清理 ----------
PROG_FILE.unlink(missing_ok=True)
print(f"✅ Finished. Metadata saved to {META_FILE}")
