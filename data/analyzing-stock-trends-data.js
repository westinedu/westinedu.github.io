window.mindmapData = {
  nodes: [
    // 0: 根节点
    {
      text: "Analyzing Stock Trends",
      description: "Techniques and methods to identify market trends in stocks",
      important: true,
      classic: "Key Concepts: Trend Lines, Moving Averages",
      person: "Various Analysts"
    },

    // 1~4: 四个中间层节点
    {
      text: "Trend Identification",
      description: "Methods to identify and confirm stock market trends"
    },
    {
      text: "Indicators & Tools",
      description: "Key technical indicators for analyzing market momentum & direction"
    },
    {
      text: "Patterns & Structures",
      description: "Recognizable formations in price data that signal potential moves"
    },
    {
      text: "Risk & Strategy",
      description: "Ways to manage risk and capitalize on trends"
    },

    // 5~8: 原先的“趋势识别”子节点
    { text: "Trend Lines", description: "Drawing lines connecting higher lows or lower highs" },
    { text: "Moving Averages", description: "MA, EMA, SMA, WMA to smooth out price data" },
    { text: "Market Phases", description: "Accumulation, Mark-up, Distribution, Mark-down" },
    { text: "Support & Resistance", description: "Key price levels where buying/selling pressure emerges" },

    // 9~12: 原先的“指标和工具”子节点
    { text: "RSI", description: "Relative Strength Index, measures momentum" },
    { text: "MACD", description: "Moving Average Convergence Divergence, tracks momentum & trend" },
    { text: "Bollinger Bands", description: "Volatility bands around a moving average" },
    { text: "Volume Analysis", description: "Confirm trends with volume spikes/drops" },

    // 13~16: 原先的“形态和结构”子节点
    { text: "Chart Patterns", description: "Head & Shoulders, Double Tops/Bottoms, Triangles" },
    { text: "Candlestick Patterns", description: "Hammer, Doji, Engulfing, etc." },
    { text: "Breakouts & Pullbacks", description: "Identify trend continuation or reversal" },
    { text: "Price Channels", description: "Parallel lines to gauge trend boundaries" },

    // 17~20: 原先的“风险管理和策略”子节点
    { text: "Stop-Loss Placement", description: "Protect capital by limiting downside" },
    { text: "Position Sizing", description: "Allocate capital based on risk tolerance" },
    { text: "Trend Following Strategy", description: "Ride the trend until it ends" },
    { text: "Counter-Trend Strategy", description: "Fade extremes or look for reversals" }
  ],
  connections: [
    // 根节点(0) → 四大中间层(1~4)
    [0, 1], [0, 2], [0, 3], [0, 4],

    // Trend Identification(1) → 5~8
    [1, 5], [1, 6], [1, 7], [1, 8],

    // Indicators & Tools(2) → 9~12
    [2, 9], [2, 10], [2, 11], [2, 12],

    // Patterns & Structures(3) → 13~16
    [3, 13], [3, 14], [3, 15], [3, 16],

    // Risk & Strategy(4) → 17~20
    [4, 17], [4, 18], [4, 19], [4, 20]
  ]
};
