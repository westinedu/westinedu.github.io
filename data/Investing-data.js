window.mindmapData = {
  nodes: [
  // 0. 根节点
  {
    text: "Investing",
    important: true,
    classic: "经典著作：《The Intelligent Investor》",
    person: "Benjamin Graham",
    image: "https://via.placeholder.com/150?text=Investing",
    description: "投资的核心理念与长期价值创造"
  },

  // 1~5. 一级分支
  { text: "Asset Classes", description: "常见的主要资产类别" },
  { text: "Investment Strategies", description: "常见投资策略" },
  { text: "Portfolio Management", description: "投资组合管理方法" },
  { text: "Behavioral Finance", description: "研究投资者行为偏差" },
  { text: "Financial Markets", description: "主要金融市场" },

  // 6~10. 资产类别子节点
  { text: "Stocks", description: "股票投资基础" },
  { text: "Bonds", description: "债券与固定收益" },
  { text: "Real Estate", description: "房地产投资" },
  { text: "Commodities", description: "大宗商品与对冲通胀" },
  { text: "Cryptocurrencies", description: "数字货币与区块链资产" },

  // 11~14. 投资策略子节点
  {
    text: "Value Investing",
    important: true,
    classic: "安全边际 (Margin of Safety)",
    person: "Benjamin Graham",
    description: "低估价买入优质股票的策略"
  },
  { text: "Growth Investing", description: "寻找高成长企业" },
  { text: "Index Investing", description: "被动跟踪指数，降低成本" },
  { text: "Momentum Investing", description: "追随趋势与动能的策略" },

  // 15~18. 投资组合管理子节点
  { text: "Asset Allocation", description: "不同资产的配比" },
  { text: "Risk Management", description: "识别、评估与应对风险" },
  { text: "Diversification", description: "分散化降低集中风险" },
  { text: "Rebalancing", description: "定期或条件性调仓" },

  // 19~22. 行为金融学子节点
  { text: "Overconfidence Bias", description: "过度自信导致的投资决策偏差" },
  { text: "Loss Aversion", description: "对损失更敏感的心理" },
  { text: "Anchoring", description: "锚定效应对价格判断的影响" },
  { text: "Herd Behavior", description: "从众行为在市场中的体现" },

  // 23~26. 金融市场子节点
  { text: "Stock Market", description: "股票市场的结构与交易",
    link: "Stock-market_index1.0.html"},
  { text: "Bond Market", description: "国债、公司债与收益率" },
  { text: "Forex Market", description: "外汇市场与汇率机制" },
  { text: "Futures & Options", description: "衍生品市场的基础" },

  // 27~29. Value Investing 的更深层节点
  { text: "Margin of Safety", description: "以折价买入优质资产的核心理念" },
  { text: "Intrinsic Value", description: "对公司真实价值的评估方法" },
  { text: "Graham Number", description: "用于粗略计算股票合理价位的公式" },

  // 30~32. Risk Management 的更深层节点
  { text: "Stop-Loss Orders", description: "设置止损价格以限制亏损" },
  { text: "Value at Risk (VaR)", description: "统计方法估算潜在最大损失" },
  { text: "Hedging", description: "利用衍生品对冲市场波动风险" },

  // 33~34. Stocks 的更深层节点
  { text: "Dividends", description: "公司向股东分配利润" },
  { text: "Stock Buybacks", description: "公司回购股份以减少流通股" }
  ],
  connections: [
  // 根节点(0) → 一级分支(1~5)
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],

  // Asset Classes(1) → 6~10
  [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],

  // Investment Strategies(2) → 11~14
  [2, 11], [2, 12], [2, 13], [2, 14],

  // Portfolio Management(3) → 15~18
  [3, 15], [3, 16], [3, 17], [3, 18],

  // Behavioral Finance(4) → 19~22
  [4, 19], [4, 20], [4, 21], [4, 22],

  // Financial Markets(5) → 23~26
  [5, 23], [5, 24], [5, 25], [5, 26],

  // Value Investing(11) → 27~29
  [11, 27], [11, 28], [11, 29],

  // Risk Management(16) → 30~32
  [16, 30], [16, 31], [16, 32],

  // Stocks(6) → 33~34
  [6, 33], [6, 34]
  ]
};
