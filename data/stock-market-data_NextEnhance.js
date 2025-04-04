
window.mindmapData = {
  nodes: [
    { text: "0. Stock Market", description: "The stock market is a marketplace where shares of publicly-held companies are issued, bought, and sold." },
    { text: "I. Stock Market Overview", description: "This section provides a foundational view of how the stock market operates, who participates, and how trades are executed." },
    { text: "1. Exchanges", description: "Places where stock transactions occur, including physical and electronic venues." },
    { text: "1.1 NYSE", description: "New York Stock Exchange – the largest equities exchange in the world." },
    { text: "1.2 NASDAQ", description: "NASDAQ is an electronic exchange and home to many tech giants." },
    { text: "1.3 Shanghai Stock Exchange", description: "One of the largest exchanges in Asia, based in China." },
    { text: "1.4 London Stock Exchange", description: "A leading European stock exchange located in the UK." },
    { text: "2. Market Participants", description: "The various players who operate within the stock market." },
    { text: "2.1 Retail Investors", description: "Individual investors trading on their own behalf." },
    { text: "2.2 Institutional Investors", description: "Large entities like pension funds and mutual funds." },
    { text: "2.3 Market Makers", description: "Firms that provide liquidity by continuously buying and selling." },
    { text: "3. Trading Mechanisms", description: "The infrastructure and rules that enable stock trading." },
    { text: "3.1 Order Matching", description: "The system that pairs buy and sell orders." },
    { text: "3.2 Clearing & Settlement", description: "Processes that finalize trades and transfer assets." },
    { text: "3.3 Bid-Ask Spread", description: "The difference between the highest price a buyer is willing to pay and the lowest price a seller is willing to accept." },
    { text: "II. Market Instruments & Indices", description: "This section explores market benchmarks that reflect economic sectors and investor sentiment." },
    { text: "4. Market Indices", description: "Indexes are statistical measures that track stock performance across a selection of companies." },
    { text: "4.1 S&P 500", description: "Tracks 500 large-cap U.S. companies, considered a benchmark for U.S. equity." },
    { text: "4.2 Dow Jones Industrial Average", description: "30 major U.S. industrial companies; price-weighted index." },
    { text: "4.3 NASDAQ Composite", description: "Tracks all NASDAQ-listed stocks, especially tech sector." },
    { text: "4.4 Russell 2000", description: "Tracks 2,000 small-cap U.S. companies, reflecting market breadth." },
    { text: "III. Trading Strategies & Tools", description: "Covers tools and strategies such as order types and technical indicators." },
    { text: "5. Order Types", description: "Understanding different types of trade orders is critical to controlling entry, exit, and risk." },
    { text: "5.1 Market Order", description: "Executes immediately at the current market price." },
    { text: "5.2 Limit Order", description: "Executes at a specified price or better." },
    { text: "5.3 Stop-Loss Order", description: "Automatically exits a position when price hits a predefined level." },
    { text: "6. Technical Indicators", description: "Statistical calculations based on price, volume, and momentum." },
    { text: "6.1 RSI", description: "Relative Strength Index helps identify overbought or oversold conditions." },
    { text: "6.2 MACD", description: "Moving Average Convergence Divergence measures trend and momentum." },
    { text: "6.3 Bollinger Bands", description: "Uses volatility bands to identify price deviations." },
    { text: "6.4 Moving Averages", description: "Smooths price data to identify trend direction." },
    { text: "IV. Market Fundamentals", description: "Focuses on evaluating a company’s intrinsic value using its financial statements." },
    { text: "7. Fundamental Analysis", description: "Analyzing a company’s business, financials, and performance to estimate value." },
    { text: "7.1 Financial Ratios", description: "Includes P/E, debt-to-equity, return on equity, etc." },
    { text: "7.2 Earnings Reports", description: "Quarterly updates on company profitability and guidance." },
    { text: "7.3 Balance Sheet Analysis", description: "Examining assets, liabilities, and shareholder equity." },
    { text: "8. Valuation Models", description: "Frameworks to estimate stock value based on future cash flow or comparative metrics." },
    { text: "8.1 DCF", description: "Discounted Cash Flow projects future income and discounts to present value." },
    { text: "8.2 P/E Ratio", description: "Price-to-earnings ratio is a quick indicator of relative valuation." },
    { text: "8.3 PEG Ratio", description: "Growth-adjusted P/E ratio—used for growth stock comparisons." },
    { text: "V. Regulation & IPO", description: "Explores rules and governing bodies in markets, and how companies go public." },
    { text: "9. Market Regulation", description: "Covers regulatory institutions and rules for transparency and protection." },
    { text: "9.1 SEC (U.S.)", description: "U.S. securities regulator, overseeing public companies and markets." },
    { text: "9.2 FINRA", description: "Self-regulatory body for brokerage firms and market participants." },
    { text: "9.3 Compliance Standards", description: "Legal obligations for reporting, audits, and disclosures." },
    { text: "10. IPO Process", description: "Steps for companies to go public and raise capital through the stock market." },
    { text: "10.1 Underwriting", description: "Banks or brokers guarantee sale of new shares." },
    { text: "10.2 Roadshow", description: "Marketing tour to promote the IPO to institutional investors." },
    { text: "10.3 Pricing & Launch", description: "Final pricing and release date determined by underwriters." }
  ],
  connections: [
    [0, "I. Stock Market Overview"], [0, "II. Market Instruments & Indices"], [0, "III. Trading Strategies & Tools"],
    [0, "IV. Market Fundamentals"], [0, "V. Regulation & IPO"],
  
    ["I. Stock Market Overview", 1], [1, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [1, 7], [7, 8], [7, 9], [7, 10],
    [1, 11], [11, 12], [11, 13], [11, 14],
  
    ["II. Market Instruments & Indices", 15], [15, 16], [15, 17], [15, 18], [15, 19],
  
    ["III. Trading Strategies & Tools", 20], [20, 21], [20, 22], [20, 23],
    ["III. Trading Strategies & Tools", 24], [24, 25], [24, 26], [24, 27], [24, 28],
  
    ["IV. Market Fundamentals", 29], [29, 30], [29, 31], [29, 32],
    [29, 33], [33, 34], [33, 35], [33, 36],
  
    ["V. Regulation & IPO", 37], [37, 38], [37, 39], [37, 40],
    [37, 41], [41, 42], [41, 43], [41, 44]
  ]
  
};
