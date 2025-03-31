window.mindmapData = {
  nodes: [
    // 0: 根节点
    {
      text: "Impact of Global Events on Stocks",
      description: "How worldwide occurrences shape market behavior",
      important: true,
      classic: "Key Factors: Geopolitical, Economic, Health, Natural Disasters",
      person: "Various Analysts"
    },

    // 1~10: 不同类型的全球事件
    {
      text: "Geopolitical Tensions",
      description: "Wars, conflicts, or heightened tensions often cause market uncertainty and volatility."
    },
    {
      text: "Natural Disasters",
      description: "Earthquakes, hurricanes, floods disrupt supply chains and production, affecting stock prices."
    },
    {
      text: "Pandemics",
      description: "Disease outbreaks like COVID-19 or SARS can drastically impact economic activity and investor sentiment."
    },
    {
      text: "Trade Agreements & Tariffs",
      description: "Free trade deals or tariff impositions shift competitive advantages, influencing corporate earnings."
    },
    {
      text: "Central Bank Policies",
      description: "Interest rate decisions, quantitative easing, or tightening alter liquidity and risk appetite."
    },
    {
      text: "Election Outcomes",
      description: "Changes in government leadership or policy direction can create market optimism or concern."
    },
    {
      text: "Regulatory Changes",
      description: "New laws or regulations can significantly affect certain sectors (tech, energy, finance, etc.)."
    },
    {
      text: "Commodity Price Shocks",
      description: "Oil price spikes, metal shortages, or agricultural disruptions hamper production and consumer spending."
    },
    {
      text: "Currency Fluctuations",
      description: "Exchange rate swings influence exporters, importers, and overall market competitiveness."
    },
    {
      text: "Market Sentiment & Media",
      description: "Fear or optimism driven by global headlines and news cycles shapes investor behavior."
    }
  ],
  connections: [
    // 从根节点(0)到子节点(1~10)
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [0, 6], [0, 7], [0, 8], [0, 9], [0, 10]
  ]
};
