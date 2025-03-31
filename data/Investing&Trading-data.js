window.mindmapData = {
  nodes: [
    // 0. 根节点
    {
      text: "Investing Practices",
      description: "整合市场分析与交易技术，探索投资全局",
      important: true
    },
    // 1. 市场分析
    {
      text: "Market Analysis",
      description: "分析市场趋势及内在因素"
    },
    // 2. 交易技术
    {
      text: "Trading Techniques",
      description: "多种交易方式与策略，实现高效执行"
    },
    // 3. 长期投资
    {
      text: "Long-Term Investing",
      description: "着眼长期价值与成长，构建稳健投资组合"
    },
    // 4. 投资组合多元化
    {
      text: "Portfolio Diversification",
      description: "分散风险，平衡各类资产配置"
    },
    // ===== 市场分析分支 =====
    // 5. 基本面分析
    {
      text: "Fundamental Analysis",
      description: "评估企业财报、行业及宏观经济数据"
    },
    // 6. 技术分析
    {
      text: "Technical Analysis",
      description: "通过图表、趋势与指标判断市场走势"
    },
    // 7. 定量分析
    {
      text: "Quantitative Analysis",
      description: "利用统计模型和数据驱动策略进行分析"
    },
    // 8. 情绪分析
    {
      text: "Sentiment Analysis",
      description: "通过新闻、社交媒体捕捉市场情绪"
    },
    // 9. 经济指标
    {
      text: "Economic Indicators",
      description: "关注GDP、通胀、就业等关键经济数据"
    },
    // 10. 估值方法
    {
      text: "Valuation Methods",
      description: "采用DCF、倍数比较等方法确定股票价值"
    },
    // ===== 交易技术分支 =====
    // 11. 日内交易
    {
      text: "Day Trading",
      description: "利用短期波动进行快速交易"
    },
    // 12. 波段交易
    {
      text: "Swing Trading",
      description: "捕捉短至中期趋势的交易策略"
    },
    // 13. 趋势跟随交易
    {
      text: "Position Trading",
      description: "基于长期趋势的持仓策略"
    },
    // 14. 算法交易
    {
      text: "Algorithmic Trading",
      description: "利用自动化程序和模型执行交易"
    },
    // 15. 风险管理
    {
      text: "Risk Management",
      description: "止损、仓位管理、对冲等控制风险的方法"
    },
    // 16. 订单类型
    {
      text: "Order Types",
      description: "市价单、限价单、止损单等订单类型"
    },
    // 17. 技术工具与指标
    {
      text: "Technical Tools & Indicators",
      description: "RSI、MACD、移动均线、Bollinger Bands 等"
    },
    // 18. 图表形态
    {
      text: "Chart Patterns",
      description: "头肩顶、双底、三角形等形态识别"
    }
  ],
  connections: [
    // 根节点与各大主题分支
    [0, 1], // Investing & Trading → Market Analysis
    [0, 2], // Investing & Trading → Trading Techniques
    [0, 3], // Investing & Trading → Long-Term Investing
    [0, 4], // Investing & Trading → Portfolio Diversification

    // Market Analysis 分支
    [1, 5], // Market Analysis → Fundamental Analysis
    [1, 6], // Market Analysis → Technical Analysis
    [1, 7], // Market Analysis → Quantitative Analysis
    [1, 8], // Market Analysis → Sentiment Analysis
    [1, 9], // Market Analysis → Economic Indicators
    [1, 10], // Market Analysis → Valuation Methods

    // Trading Techniques 分支
    [2, 11], // Trading Techniques → Day Trading
    [2, 12], // Trading Techniques → Swing Trading
    [2, 13], // Trading Techniques → Position Trading
    [2, 14], // Trading Techniques → Algorithmic Trading
    [2, 15], // Trading Techniques → Risk Management
    [2, 16], // Trading Techniques → Order Types
    [2, 17], // Trading Techniques → Technical Tools & Indicators
    [2, 18]  // Trading Techniques → Chart Patterns
  ]
};
