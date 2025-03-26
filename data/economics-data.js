window.mindmapData = {
  nodes: [
    // 0 ~ 43 原有节点保持不变
    { text: "Economics", important: true, classic: "经典理论：市场均衡", person: "亚当·斯密", image: "https://via.placeholder.com/100?text=Adam+Smith" },
    { text: "Microeconomics" },
    { text: "Macroeconomics" },
    { text: "Demand & Supply" },
    { text: "Market Structures" },
    { text: "Production Theory" },
    { text: "Cost Theory" },
    { text: "Utility Theory" },
    { text: "GDP" },
    { text: "Inflation" },
    { text: "Unemployment" },
    { text: "Fiscal Policy" },
    { text: "Monetary Policy" },
    { text: "International Trade" },
    { text: "Exchange Rates" },
    { text: "Supply-Demand Curve" },
    { text: "Perfect Competition" },
    { text: "Cost-Benefit Analysis" },
    { text: "Law of Diminishing Returns" },
    { text: "Keynesian Theory", important: true, classic: "经典理论：凯恩斯理论", person: "凯恩斯", image: "https://via.placeholder.com/100?text=Keynes" },
    { text: "Phillips Curve" },
    { text: "IS-LM Model", important: true, classic: "经典理论：IS-LM 模型", person: "凯恩斯", image: "https://via.placeholder.com/100?text=IS-LM" },
    { text: "Quantity Theory of Money" },
    { text: "Comparative Advantage" },
    { text: "Purchasing Power Parity" },
    { text: "Behavioral Economics" },
    { text: "Development Economics" },
    { text: "Environmental Economics" },
    { text: "Health Economics" },
    { text: "International Finance" },
    { text: "Financial Markets" },
    { text: "Corporate Finance" },
    { text: "Investment Analysis" },
    { text: "Risk Management" },
    { text: "Derivatives" },
    { text: "Portfolio Theory" },
    { text: "Asset Pricing" },
    { text: "Game Theory" },
    { text: "Public Economics" },
    { text: "Urban Economics" },
    { text: "Agricultural Economics" },
    { text: "Labor Economics" },
    { text: "Political Economy" },
    { text: "Behavioral Finance" },

    // -----------------------
    // 以下为新增加的节点 (44 ~ 63)
    // -----------------------

    // Supply-Demand Curve (节点 15) 的子节点
    { text: "Law of Demand", description: "价格与需求量之间的反向关系" },                 // 44
    { text: "Law of Supply", description: "价格与供给量之间的正向关系" },                 // 45
    { text: "Elasticities", description: "价格弹性、收入弹性、交叉弹性等" },              // 46
    { text: "Consumer Surplus", description: "消费者剩余的含义与计算" },                   // 47
    { text: "Producer Surplus", description: "生产者剩余的含义与计算" },                   // 48
    { text: "Case Study: Gas Price Shocks", description: "油价波动对供需的实际影响" },       // 49
    {
      text: "Video: Crash Course #4",
      description: "简明介绍需求和供给的在线视频",
      // 你可替换成实际 YouTube embed 链接
      videoUrl: "https://www.youtube.com/embed/EXAMPLE_VIDEO_ID"
    },                                                                                    // 50

    // IS-LM Model (节点 21) 的子节点
    { text: "IS Curve", description: "投资-储蓄曲线，产出与利率的关系" },                // 51
    { text: "LM Curve", description: "流动性偏好-货币曲线，货币供给与利率的关系" },         // 52
    { text: "Shifts in IS/LM", description: "政策或外部冲击导致曲线移动的分析" },           // 53
    { text: "Liquidity Preference", description: "凯恩斯对货币需求的核心假设" },            // 54
    {
      text: "Video: IS-LM Explanation",
      description: "IS-LM 模型的可视化教学视频",
      videoUrl: "https://www.youtube.com/embed/EXAMPLE_VIDEO_ID"
    },                                                                                    // 55

    // Behavioral Economics (节点 25) 的子节点
    { text: "Prospect Theory", description: "卡尼曼与特沃斯基提出的前景理论" },             // 56
    { text: "Bounded Rationality", description: "西蒙提出的人类理性局限性假设" },           // 57
    { text: "Nudge Theory", description: "萨斯坦和塞勒提出的助推理论" },                   // 58
    {
      text: "Video: Dan Ariely TED Talk",
      description: "非理性行为的TED演讲",
      videoUrl: "https://www.youtube.com/embed/EXAMPLE_VIDEO_ID"
    },                                                                                    // 59

    // Behavioral Finance (节点 43) 的子节点
    { text: "Overconfidence Bias", description: "过度自信偏差在投资中的表现" },           // 60
    { text: "Loss Aversion", description: "人们对损失比对收益更敏感" },                   // 61
    { text: "Herd Behavior", description: "羊群效应在金融市场中的案例" },                 // 62
    {
      text: "Video: Behavioral Finance Overview",
      description: "行为金融学的概念与主要议题简介",
      videoUrl: "https://www.youtube.com/embed/EXAMPLE_VIDEO_ID"
    }                                                                                     // 63
  ],

  connections: [
    [0, 1], [0, 2],
    [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
    [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14],
    [3, 15],
    [4, 16],
    [5, 17],
    [6, 18],
    [8, 19],
    [9, 20],
    [10, 21],
    [11, 22],
    [13, 23],
    [14, 24],
    // 新增连接
    [0, 25], [0, 26], [0, 27], [0, 28],
    [2, 29], [2, 30], [2, 31], [2, 32],
    [2, 33], [2, 34], [2, 35], [2, 36],
    [0, 37], [0, 38], [0, 39], [0, 40],
    [0, 41], [0, 42], [0, 43],
    [15, 44], [15, 45], [15, 46], [15, 47], [15, 48], [15, 49], [15, 50],
    [21, 51], [21, 52], [21, 53], [21, 54], [21, 55],
    [25, 56], [25, 57], [25, 58], [25, 59],
    [43, 60], [43, 61], [43, 62], [43, 63]
  ]
};