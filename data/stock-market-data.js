// stock-market-data.js
window.mindmapData = {
  nodes: [
    {
      text: "Stock Market",
      description: "股票市场的结构与交易",
      important: true
    },
    {
      text: "Exchanges",
      description: "各类交易所：NYSE、NASDAQ、上交所、深交所、港交所等"
    },
    {
      text: "Participants",
      description: "主要参与者：个人投资者、机构投资者、做市商等"
    },
    {
      text: "Trading Mechanisms",
      description: "订单类型（市价单、限价单等）、撮合机制、T+2 结算等"
    },
    {
      text: "Market Indices",
      description: "反映市场整体表现：如标普500、道琼斯、沪深300等"
    },
    {
      text: "Regulations",
      description: "监管机构与规则：如 SEC、CSRC、FCA 等"
    },
    {
      text: "IPO",
      description: "首次公开募股，承销流程与定价机制"
    },
    {
      text: "Secondary Market",
      description: "IPO 后股票在二级市场自由交易"
    },
    {
      text: "Market Liquidity",
      description: "流动性水平、买卖盘深度与成交量"
    },
    {
      text: "Order Types",
      description: "常见订单：限价单、止损单、止盈单、跟踪止损单等"
    }
  ],
  connections: [
    // [父节点索引, 子节点索引]
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9]
  ]
};
