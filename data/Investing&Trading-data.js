window.mindmapData = {
  nodes: [
    // 0. 根节点
    {
      text: "0. Investing Practices",
      important: true,
      classic: "The Intelligent Investor",
      person: "Benjamin Graham",
      description: `
        <strong>Investing Practices</strong> represent the core principles, techniques, and disciplines used to allocate capital effectively in financial markets.
        These practices combine <em>market analysis</em>, <em>portfolio construction</em>, and <em>risk management</em> to achieve both short-term performance and long-term wealth creation.
    
        <h4>📌 Key Elements</h4>
        - <strong>Strategy:</strong> Value investing, growth investing, trend following, and quantitative models.<br>
        - <strong>Time Horizons:</strong> Long-term (years), medium-term (months), or short-term (days to weeks).<br>
        - <strong>Asset Types:</strong> Stocks, bonds, ETFs, options, real estate, crypto, and more.
    
        <h4>📖 Philosophy</h4>
        Investing is not gambling. It is a rational, structured process that emphasizes discipline over emotion. Core ideas such as <em>“margin of safety”</em>, <em>“diversification”</em>, and <em>“risk-adjusted returns”</em> guide good investing behavior.
    
        <h4>📚 Recommended Reading</h4>
        - Benjamin Graham’s “The Intelligent Investor” (1949)  
        - Peter Lynch’s “One Up On Wall Street”  
        - John Bogle’s “The Little Book of Common Sense Investing”  
      `,
      application: `
        Suitable for individual investors, institutional fund managers, and financial advisors seeking structured, strategic capital growth. It acts as the foundation for any trading, retirement, or passive investing plan.
      `
    },    
    {
      text: "1. Market Analysis",
      description: `
        <strong>Market Analysis</strong> refers to the systematic study of financial markets to assess current trends, identify future opportunities, and avoid major risks.
        It forms the backbone of informed investment and trading decisions.
    
        <h4>📊 Two Main Types</h4>
        - <strong>Fundamental Analysis:</strong> Focuses on intrinsic value through financial statements, earnings, macroeconomics, etc.
        - <strong>Technical Analysis:</strong> Uses charts and price patterns to predict future movements based on historical data.
    
        <h4>🧭 Additional Approaches</h4>
        - <strong>Sentiment Analysis:</strong> Tracks public mood using media, social platforms, and surveys.<br>
        - <strong>Macro Analysis:</strong> Evaluates global economic forces like interest rates, central bank policy, and inflation.
    
        <h4>📚 Recommended Tools</h4>
        - Bloomberg Terminal (professional)<br>
        - TradingView / Finviz (retail)<br>
        - Economic Calendar (e.g., GDP release dates)
      `,
      application: `
        Used by traders to detect entry/exit signals, and by investors to align positions with broader economic conditions. Essential for identifying bull/bear cycles and major trend reversals.
      `
    },
    
    {
      text: "2. Trading Techniques",
      description: `
        <strong>Trading Techniques</strong> are structured approaches to buying and selling financial instruments with the goal of generating profit in varying timeframes.
    
        <h4>⚙️ Common Styles</h4>
        - <strong>Day Trading:</strong> Multiple intraday trades based on short-term volatility.<br>
        - <strong>Swing Trading:</strong> Holding positions for a few days to weeks based on price momentum.<br>
        - <strong>Position Trading:</strong> Long-term trend following with fewer trades.<br>
        - <strong>Scalping:</strong> Rapid, small-profit trades throughout the day.<br>
        - <strong>Algorithmic Trading:</strong> Automated strategies using code and backtests.
    
        <h4>🛠️ Key Tools</h4>
        - Candlestick charts, volume heatmaps, RSI/MACD indicators<br>
        - Risk-reward ratios, position sizing, and backtesting tools
      `,
      application: `
        Traders choose techniques based on risk appetite, screen time availability, and capital. Matching strategy to personality improves consistency and emotional control.
      `
    },    
    {
      text: "3. Long-Term Investing",
      classic: "One Up on Wall Street",
      person: "Peter Lynch",
      description: `
        <strong>Long-Term Investing</strong> is a buy-and-hold strategy focusing on compounding returns over years or decades. It is based on the idea that the market grows over time, despite short-term volatility.
    
        <h4>💡 Philosophy</h4>
        - “Time in the market beats timing the market.”<br>
        - Focus on fundamentals: earnings, moats, management quality<br>
        - Avoid emotional reactions to market noise
    
        <h4>🪙 Key Practices</h4>
        - Reinvesting dividends<br>
        - Regular contributions (e.g., dollar-cost averaging)<br>
        - Minimizing taxes and fees
    
        <h4>📚 Classic Works</h4>
        - Peter Lynch's “One Up on Wall Street”  
        - Warren Buffett's letters to shareholders  
        - “The Little Book of Common Sense Investing” by John Bogle
      `,
      application: `
        Ideal for retirement planning, family wealth preservation, and stress-free investing. Often implemented through index funds, dividend stocks, or real estate holdings.
      `
    },
    {
      text: "4. Portfolio Diversification",
      description: `
        <strong>Portfolio Diversification</strong> is the practice of spreading investments across different assets, sectors, and geographies to reduce exposure to any single risk.
    
        <h4>📊 Core Ideas</h4>
        - <strong>Non-correlation:</strong> Choose assets that don't move together (e.g., stocks vs. bonds)<br>
        - <strong>Asset Classes:</strong> Equities, fixed income, real estate, commodities, crypto, cash<br>
        - <strong>Geographic Spread:</strong> Domestic and international allocation
    
        <h4>📈 Why It Works</h4>
        - Lowers portfolio volatility<br>
        - Improves risk-adjusted return (Sharpe ratio)<br>
        - Protects against sector-specific crashes (e.g., tech bubble, COVID oil crash)
      `,
      application: `
        Used by institutions and individuals alike to build resilient, balanced portfolios that can weather economic cycles. Often visualized via pie charts or efficient frontier curves.
      `
    },
    {
      text: "1.1 Fundamental Analysis",
      classic: "Security Analysis",
      person: "Benjamin Graham & David Dodd",
      description: `
        <strong>Fundamental Analysis</strong> is the process of evaluating a company or asset’s intrinsic value based on financial statements, business model, and economic conditions.
    
        <h4>💡 Core Components</h4>
        - <strong>Financial Ratios:</strong> P/E, P/B, ROE, Debt-to-Equity<br>
        - <strong>Qualitative Factors:</strong> Management quality, brand strength, industry dynamics<br>
        - <strong>Macroeconomic Drivers:</strong> Interest rates, inflation, GDP trends
    
        <h4>📘 Use Cases</h4>
        - Long-term investing and value stock selection<br>
        - Equity research and M&A valuation<br>
        - Risk-adjusted capital deployment
      `,
      formula: "Intrinsic Value ≈ EPS × (1 + g)^n / (r - g)",
      application: "Helps identify undervalued or overvalued stocks and forms the basis for long-term investment decisions.",
      aiVoicePrompt: "Fundamental Analysis helps you understand the true worth of a company by analyzing its business and financial health."
    },
    {
      text: "1.2 Technical Analysis",
      description: `
        <strong>Technical Analysis</strong> studies historical market data—primarily price and volume—to forecast future price movements.
    
        <h4>📊 Common Tools</h4>
        - <strong>Indicators:</strong> RSI, MACD, Moving Averages, Bollinger Bands<br>
        - <strong>Chart Patterns:</strong> Head & Shoulders, Flags, Triangles<br>
        - <strong>Volume Analysis:</strong> Confirm breakout strength or weakness
    
        <h4>📈 TA vs FA</h4>
        Unlike fundamental analysis, TA assumes all known info is already priced into the stock. It focuses on timing and patterns, not value.
      `,
      application: "Used for timing entries and exits, especially in short- and medium-term trading strategies.",
      aiVoicePrompt: "Technical analysis uses charts and indicators to predict price trends based on past data."
    },
    {
      text: "1.3 Quantitative Analysis",
      description: `
        <strong>Quantitative Analysis</strong> uses statistical and mathematical models to evaluate securities and make trading decisions.
    
        <h4>⚙️ Techniques</h4>
        - <strong>Factor Models:</strong> Momentum, Value, Size, Volatility<br>
        - <strong>Regression Analysis:</strong> Predict relationships among variables<br>
        - <strong>Backtesting:</strong> Test strategy on historical data
    
        <h4>📘 Tools</h4>
        - Python, R, Excel, MATLAB<br>
        - Quant libraries: Pandas, Scikit-learn, Backtrader
      `,
      formula: "Expected Return = α + β1X1 + β2X2 + ... + βnXn",
      application: "Forms the basis of algorithmic and systematic trading. Favored by hedge funds and fintech platforms.",
      aiVoicePrompt: "Quantitative analysis applies math and data to build investment strategies based on statistical logic."
    },
    {
      text: "1.4 Sentiment Analysis",
      description: `
        <strong>Sentiment Analysis</strong> captures the emotional tone of the market by analyzing news headlines, social media posts, and investor surveys.
    
        <h4>💬 Sources of Sentiment</h4>
        - Twitter, Reddit, StockTwits<br>
        - News sentiment scores (e.g., Bloomberg AI NLP)<br>
        - Fear & Greed Index, VIX volatility
    
        <h4>🧠 Method</h4>
        - Natural Language Processing (NLP)<br>
        - Machine learning classifiers (e.g., positive/negative/neutral)<br>
        - Real-time dashboard scoring
      `,
      application: "Helps anticipate investor behavior, especially during high-volatility or hype-driven events like meme stocks or IPOs.",
      aiVoicePrompt: "Sentiment analysis decodes how the market feels by reading news and social media."
    },
    {
      text: "1.5 Economic Indicators",
      //image: "https://via.placeholder.com/100?text=Macro",
      description: `
        <strong>Economic Indicators</strong> are macro-level statistics that reflect the overall health and direction of an economy.
    
        <h4>📊 Leading Indicators</h4>
        - New housing starts, stock market performance, business confidence<br>
    
        <h4>📈 Lagging Indicators</h4>
        - Unemployment rate, inflation, corporate earnings
    
        <h4>🧭 Categories</h4>
        - <strong>GDP:</strong> Measures economic output<br>
        - <strong>CPI:</strong> Tracks inflation trends<br>
        - <strong>PMI:</strong> Forecasts manufacturing strength
      `,
      application: "Used to guide policy expectations, shape macro views, and anticipate interest rate moves.",
      aiVoicePrompt: "Economic indicators help investors understand the big picture—like GDP, inflation, and jobs data."
    },
    {
      text: "1.6 Technical Analysis",
      description: `
        <strong>Technical Analysis</strong> is a trading methodology focused on price action, chart patterns, and historical market data.
        
        <h4>📈 Common Tools</h4>
        - Moving averages (MA)<br>
        - RSI, MACD<br>
        - Candlestick patterns (e.g., hammer, doji)
    
        <h4>📘 Usage Differences</h4>
        • Short-term traders rely on technical signals<br>
        • Doesn’t focus on company fundamentals
    
        <h4>💬 Analogy</h4>
        "Technical analysis is like reading footprints in the sand to guess where people walked."
    
        <h4>🧪 Use Case</h4>
        Applied by day traders, swing traders, and quant models for timing entries and exits.
      `,
      aiVoicePrompt: "Technical analysis is about studying price charts and patterns to make trading decisions, without worrying about earnings or news."
    },
    {
      text: "2.1 Fundamental Analysis",
      description: `
        <strong>Fundamental Analysis</strong> involves examining a company's financial health, industry position, and macro factors to determine intrinsic value.
    
        <h4>📂 Key Metrics</h4>
        - Earnings per Share (EPS), P/E ratio<br>
        - Balance Sheet, Cash Flow Statement
    
        <h4>📘 Usage Differences</h4>
        • Long-term investors and analysts prefer fundamentals<br>
        • Best suited for value investing, buy-and-hold strategies
    
        <h4>💬 Analogy</h4>
        "Fundamental analysis is like checking the health report of a company before investing."
    
        <h4>🧪 Use Case</h4>
        Used by Warren Buffett-style value investors, fund managers, and equity analysts.
      `,
      aiVoicePrompt: "Fundamental analysis means understanding a company's actual value based on financials, not just its price chart."
    },
    {
      text: "2.2 Valuation Methods",
      description: `
        <strong>Valuation Methods</strong> are frameworks used to estimate the fair market value of an asset or company.
    
        <h4>📊 Formula (DCF)</h4>
        <code>Value = CF₁ / (1 + r)¹ + CF₂ / (1 + r)² + ... + CFₙ / (1 + r)ⁿ</code>
    
        <h4>💡 Why It Matters</h4>
        - Helps compare intrinsic vs. market value<br>
        - Useful for M&A, IPOs, long-term investments
    
        <h4>🧪 Use Case</h4>
        Used by analysts, private equity, and investors for pricing decisions, M&A activity, or IPO analysis.
      `,
      aiVoicePrompt: "Valuation methods like discounted cash flow help determine if a stock is overpriced or undervalued based on future income."
    },
    {
      text: "2.3 Quantitative Analysis",
      description: `
        <strong>Quantitative Analysis (Quant)</strong> applies mathematical and statistical techniques to evaluate market behavior and build systematic trading strategies.
    
        <h4>🧠 Core Elements</h4>
        • <strong>Backtesting:</strong> Testing a model on historical data<br>
        • <strong>Regression models:</strong> Find statistical relationships (e.g., factor models)<br>
        • <strong>Probability distributions:</strong> Estimate risk and return outcomes<br>
        • <strong>Statistical arbitrage:</strong> Exploit price discrepancies between assets
    
        <h4>📉 Formula (Example)</h4>
        <code>Sharpe Ratio = (Rₚ − Rᶠ) / σₚ</code><br>
        Where Rₚ = portfolio return, Rᶠ = risk-free rate, σₚ = portfolio standard deviation
    
        <h4>🧪 Use Case</h4>
        Used extensively by hedge funds, quant desks, and high-frequency traders to build and deploy algorithmic models that can scan thousands of opportunities with precision and speed.
    
        <h4>💬 Analogy</h4>
        "If trading were a game of chess, quantitative analysis would be the AI engine predicting 10 moves ahead."
    
        <h4>🧠 Prompt</h4>
        "Quantitative analysis relies on math, statistics, and data science to automate investment decisions. It’s the brain behind many algorithmic and quant strategies."
      `
    },
    {
      text: "2.4 Algorithmic Trading",
      description: `
        <strong>Algorithmic Trading</strong> uses computer programs to execute trading strategies automatically based on rules and data.
    
        <h4>⚙️ Strategy Types</h4>
        - Trend-following (e.g., moving average crossover)<br>
        - Mean reversion<br>
        - Arbitrage (price discrepancies)<br>
        - High-Frequency Trading (HFT)
    
        <h4>📊 Example Logic</h4>
        <code>if (SMA_20 > SMA_50) { buy(); } else { sell(); }</code>
    
        <h4>💡 Why It Matters</h4>
        Algorithmic trading increases market efficiency, reduces latency, and eliminates emotional bias — but it also raises concerns over flash crashes and manipulation when used at scale.
      `,
      application: "Used by institutions and quant funds to automate trading based on data-driven logic and reduce human error.",
      aiVoicePrompt: "Algorithmic trading uses computer code to automate buying and selling decisions based on market data."
    },
    {
      text: "2.5 Risk Management",
      description: `
        <strong>Risk Management</strong> is the practice of identifying, analyzing, and minimizing financial loss. It ensures traders and investors survive through volatility and avoid catastrophic drawdowns.
    
        <h4>🧰 Techniques</h4>
        - <strong>Stop-Loss:</strong> Automatically exit losing trades<br>
        - <strong>Position Sizing:</strong> Control risk per trade<br>
        - <strong>Hedging:</strong> Use offsetting positions to reduce risk (e.g., options)
    
        <h4>📊 Formula (Position Sizing)</h4>
        <code>Position Size = Risk $ / (Entry Price − Stop Loss)</code>
    
        <h4>🔍 Application</h4>
        Used by all traders—from retail to institutions—to manage exposure, preserve capital, and maintain discipline.
    
        <h4>💡Prompt</h4>
        "Risk management is how you stay in the game. From stop-losses to hedging, it keeps your portfolio from disaster."
      `
    },
    {
      text: "2.6 Order Types",
      description: `
        <strong>Order Types</strong> define how your trade enters the market. Understanding them is key to execution and risk control.
    
        <h4>💡 Main Types</h4>
        - <strong>Market Order:</strong> Immediate execution at current price<br>
        - <strong>Limit Order:</strong> Only executes at a set price or better<br>
        - <strong>Stop-Loss Order:</strong> Triggered if price moves against your position
    
        <h4>📌 Advanced Variants</h4>
        - <strong>Stop-Limit:</strong> Combines stop and limit conditions<br>
        - <strong>Trailing Stop:</strong> Dynamically follows price to lock in profits
    
        <h4>🔍 Use Case</h4>
        Traders use order types to automate execution, avoid slippage, and reduce emotional decision-making.
    
        <h4>💡Prompt</h4>
        "Order types are your interface with the market—like sending a buy-now or wait-for-a-deal signal to the exchange."
      `
    },
    {
      text: "2.7 Technical Tools & Indicators",
      description: `
        <strong>Technical Indicators</strong> are tools used to interpret price and volume data. They help identify trends, reversals, and momentum shifts.
    
        <h4>🔧 Common Tools</h4>
        - <strong>RSI:</strong> Measures overbought/oversold conditions<br>
        - <strong>MACD:</strong> Reveals trend strength and crossovers<br>
        - <strong>Bollinger Bands:</strong> Show price volatility and breakout potential<br>
        - <strong>Moving Averages:</strong> Smooth price trends
    
        <h4>🧪 Application</h4>
        These indicators help traders fine-tune entries and exits or confirm trade direction in real-time.
    
        <h4>💡Prompt</h4>
        "Indicators help decode market noise. Think of them like a dashboard: speed, pressure, and direction at a glance."
      `
    },
    {
      text: "2.8 Chart Patterns",
      description: `
        <strong>Chart Patterns</strong> are visual formations in price charts that suggest future market behavior based on historical repetition.
    
        <h4>🔍 Major Reversal Patterns</h4>
        - Head and Shoulders<br>
        - Double Top & Double Bottom<br>
        - Rounding Top / Bottom
    
        <h4>📈 Continuation Patterns</h4>
        - Triangles (symmetrical, ascending, descending)<br>
        - Flags and Pennants<br>
        - Rectangles
    
        <h4>Application</h4>
        Traders use patterns to anticipate breakouts, reversals, and to set targets or stops.
    
        <h4>💡Prompt</h4>
        "Chart patterns are the market’s body language. Learn them, and you start to see what's coming next."
      `
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
