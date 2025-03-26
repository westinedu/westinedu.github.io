window.mindmapData = {
  nodes: [
    { text: "Business School Courses", description: "国际顶级商学院常见课程体系" },                // 0: 根节点

    { text: "Undergraduate Courses", description: "本科阶段的商学院课程" },                      // 1
    { text: "MBA Courses", description: "MBA 及硕士阶段核心与选修课程" },                         // 2
    { text: "Financial Masters Courses", description: "金融硕士课程体系" },                        // 3
    { text: "EMBA Courses", description: "高级管理人员工商管理硕士课程体系" },                      // 4

    // Undergraduate Courses 下的子节点
    { text: "Foundational Courses", description: "基础商科课程" },                                // 5
    { text: "Advanced/Professional Courses", description: "专业进阶课程" },                       // 6

    // Foundational Courses 的子节点
    { text: "Microeconomics", description: "研究个体经济行为" },                                  // 7
    { text: "Macroeconomics", description: "国民经济整体分析" },                                   // 8
    { text: "Principles of Accounting", description: "会计基本原理" },                              // 9
    { text: "Principles of Marketing", description: "市场营销基本理论" },                            // 10
    { text: "Principles of Management", description: "管理基本原理" },                              // 11

    // Advanced/Professional Courses 的子节点
    { text: "Financial Markets and Institutions", description: "金融市场及机构运作" },               // 12
    { text: "Operations Management", description: "生产与服务系统设计与改进" },                     // 13
    { text: "Business Data Analytics", description: "商业数据收集与分析" },                         // 14
    { text: "International Business", description: "跨国企业经营与全球战略" },                        // 15

    // MBA Courses 下的子节点
    { text: "Core MBA Courses", description: "MBA核心课程" },                                   // 16
    { text: "MBA Electives", description: "MBA选修课程" },                                       // 17

    // Core MBA Courses 的子节点
    { text: "Managerial Economics", description: "企业决策中的经济分析" },                          // 18
    { text: "Organizational Behavior", description: "组织内个体与群体行为研究" },                     // 19
    { text: "Marketing Management", description: "市场营销战略及实践" },                               // 20
    { text: "Financial Management", description: "企业财务管理基本原理" },                             // 21
    { text: "Operations Management (MBA)", description: "MBA级运营管理" },                          // 22
    { text: "Strategic Management", description: "企业战略规划与实施" },                              // 23

    // MBA Electives 的子节点
    { text: "Entrepreneurship Management", description: "创业过程与商业模式设计" },                   // 24
    { text: "Project Management", description: "项目规划与风险控制" },                              // 25
    { text: "Supply Chain Management", description: "供应链设计与优化" },                             // 26
    { text: "Leadership Development", description: "领导力培养与团队管理" },                         // 27
    { text: "E-commerce", description: "电子商务模式与市场趋势" },                                   // 28

    // Financial Masters Courses 下的子节点
    { text: "Core Courses (Financial Masters)", description: "金融硕士核心课程" },                  // 29
    { text: "Electives (Financial Masters)", description: "金融硕士选修课程" },                       // 30

    // Core Courses (Financial Masters) 的子节点
    { text: "Investment", description: "投资工具与组合理论" },                                     // 31
    { text: "Corporate Finance", description: "企业融资与投资决策" },                                // 32
    { text: "Financial Markets", description: "金融市场结构与机制" },                                // 33
    { text: "Econometrics", description: "统计与数学模型在金融中的应用" },                            // 34
    { text: "International Finance", description: "国际金融体系与汇率机制" },                         // 35

    // Electives (Financial Masters) 的子节点
    { text: "Financial Risk Management", description: "金融风险识别与管理" },                          // 36
    { text: "Fintech", description: "金融科技与区块链应用" },                                       // 37
    { text: "Mergers and Acquisitions", description: "并购重组策略及财务分析" },                        // 38
    { text: "Asset Securitization", description: "资产证券化基本原理" },                              // 39

    // EMBA Courses 下的子节点
    { text: "Core Courses (EMBA)", description: "EMBA核心课程" },                                  // 40
    { text: "Specialized Electives (EMBA)", description: "EMBA特色与选修课程" },                     // 41

    // Core Courses (EMBA) 的子节点
    { text: "Economic Analysis", description: "宏观与微观经济分析" },                                // 42
    { text: "Marketing Management (EMBA)", description: "EMBA级市场营销管理" },                        // 43
    { text: "Strategic Management Accounting", description: "战略决策的会计支持" },                      // 44
    { text: "Organizational Behavior (EMBA)", description: "EMBA级组织行为学" },                        // 45
    { text: "Operations Management (EMBA)", description: "EMBA级运营管理" },                          // 46

    // Specialized Electives (EMBA) 的子节点
    { text: "The Chinese Economy", description: "中国经济发展模式与机遇" },                           // 47
    { text: "Leadership Development (EMBA)", description: "EMBA级领导力培养" },                        // 48
    { text: "Overseas Modules", description: "国际学习交流模块" },                                  // 49
    { text: "Digital Transformation", description: "数字化时代的企业转型" }                           // 50
  ],
  connections: [
    [0,1], [0,2], [0,3], [0,4],
    [1,5], [1,6],
    [5,7], [5,8], [5,9], [5,10], [5,11],
    [6,12], [6,13], [6,14], [6,15],
    [2,16], [2,17],
    [16,18], [16,19], [16,20], [16,21], [16,22], [16,23],
    [17,24], [17,25], [17,26], [17,27], [17,28],
    [3,29], [3,30],
    [29,31], [29,32], [29,33], [29,34], [29,35],
    [30,36], [30,37], [30,38], [30,39],
    [4,40], [4,41],
    [40,42], [40,43], [40,44], [40,45], [40,46],
    [41,47], [41,48], [41,49], [41,50]
  ]
};
