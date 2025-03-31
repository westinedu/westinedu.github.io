window.mindmapData = {
  nodes: [
      // 中心主题
      { text: "Develop and Sell Mobile Apps", important: true, image: "https://via.placeholder.com/100?text=App" },
      // 一级分支
      { text: "App Development", important: true },
      { text: "Marketing & Sales", important: true },
      { text: "Business & Monetization", important: true },
      // App Development 下
      { text: "Platform Selection" },
      { text: "Development Tools & Frameworks" },
      { text: "UI/UX Design" },
      { text: "Testing & QA" },
      { text: "Deployment" },
      // Platform Selection 下
      { text: "iOS" },
      { text: "Android" },
      { text: "Cross-Platform" },
      // Development Tools 下
      { text: "Swift/Objective-C" },
      { text: "Kotlin/Java" },
      { text: "React Native/Flutter" },
      // UI/UX Design 下
      { text: "User Research" },
      { text: "Prototyping" },
      // Marketing & Sales 下
      { text: "App Store Optimization" },
      { text: "Social Media Marketing" },
      { text: "Paid Advertising" },
      { text: "Public Relations" },
      { text: "Customer Reviews & Ratings" },
      // Business & Monetization 下
      { text: "Freemium Model" },
      { text: "Paid Apps" },
      { text: "In-App Purchases" },
      { text: "Subscription Model" },
      { text: "Ad Revenue" },
      { text: "Analytics & Metrics" }
  ],
  connections: [
      // 中心 -> 一级
      [0, 1], [0, 2], [0, 3],
      // App Development -> 子节点
      [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
      // Platform Selection -> 下级
      [4, 9], [4, 10], [4, 11],
      // Development Tools -> 下级
      [5, 12], [5, 13], [5, 14],
      // UI/UX Design -> 下级
      [6, 15], [6, 16],
      // Marketing & Sales -> 子节点
      [2, 17], [2, 18], [2, 19], [2, 20], [2, 21],
      // Business & Monetization -> 子节点
      [3, 22], [3, 23], [3, 24], [3, 25], [3, 26], [3, 27]
  ]
};
