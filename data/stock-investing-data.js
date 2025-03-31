window.mindmapData = {
  nodes: [
    // 0. 统一根节点
    {
      text: "Stock Investing",
      description: "融合投资、交易策略和股票市场分析的全局视图",
      important: true, image: "StockInvesting.png"
    },
    // 1. Investing & Trading 分支
    {
      text: "Investing & Trading",
      description: "涵盖市场分析与多种交易技术"
    },
    // 2. Stock Market 分支
    {
      text: "Stock Market",
      description: "股票市场的结构、参与者及运行机制"
    },
    // Investing & Trading 下的子节点
    {
      text: "Market Analysis",
      description: "评估市场趋势、基本面、技术面等"
    },
    {
      text: "Trading Techniques",
      description: "日内交易、波段交易、算法交易等策略"
    },
    {
      text: "Long-Term Investing",
      description: "注重价值投资与长期资产配置"
    },
    {
      text: "Portfolio Diversification",
      description: "分散风险，平衡各类资产组合"
    },
    // Stock Market 下的子节点
    {
      text: "Exchanges",
      description: "全球各大交易所（NYSE、NASDAQ、上交所等）"
    },
    {
      text: "Participants",
      description: "个人投资者、机构、做市商等市场参与者"
    },
    {
      text: "Trading Mechanisms",
      description: "订单类型、撮合机制、结算规则等"
    },
    {
      text: "Market Indices",
      description: "反映市场整体表现的指数，如标普500、道琼斯"
    },
    {
      text: "Regulations",
      description: "市场监管、交易规则及相关机构"
    },
    {
      text: "IPO",
      description: "首次公开募股与发行流程"
    },
    {
      text: "Secondary Market",
      description: "二级市场交易及流动性分析"
    },
    {
      text: "Market Liquidity",
      description: "市场深度、成交量及流动性水平"
    },
    {
      text: "Order Types",
      description: "市价单、限价单、止损单等订单种类"
    },
    // 扩展：Investing & Trading 分支下的新节点
    {
      text: "Financial Ratios",
      description: "利用市盈率、市净率等指标评估企业的财务状况及价值"
    },
    {
      text: "Risk Metrics",
      description: "通过波动率、夏普比率、贝塔值等指标评估投资风险"
    },
    {
      text: "Investment Styles",
      description: "涵盖价值投资、成长投资、收入投资等不同投资风格"
    },
    {
      text: "Global Markets",
      description: "分析跨国市场、汇率变化及国际资本流动对股票市场的影响"
    }
  ],
  connections: [
    // 从统一根节点接入两个大分支
    [0, 1],
    [0, 2],
    // Investing & Trading 分支的连接（节点 1 的子节点）
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    // Stock Market 分支的连接（节点 2 的子节点）
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
    [2, 11],
    [2, 12],
    [2, 13],
    [2, 14],
    // Investing & Trading 分支扩展的新节点（添加为节点 16~19 的子节点）
    [1, 16],
    [1, 17],
    [1, 18],
    [1, 19]
  ]
};
