window.mindmapData = {
  nodes: [
      { text: "Ray Dalio", important: true, classic: "Bridgewater创始人", person: "Ray Dalio", image: "Ray Dalio.png" },
      { text: "名言", description: "Ray Dalio 的名言", expanded: true },
      { text: "著作", description: "Ray Dalio 的著作", expanded: true },
      { text: "视频", description: "Ray Dalio 的视频", expanded: true },
      // 名言分支下的名句
      { text: "Pain + Reflection = Progress", description: "痛苦 + 反思 = 进步", expanded: false },
      { text: "Don't confuse what you wish were true with what is really true.", description: "不要把你希望是真的与实际真相混淆", expanded: false },
      // 著作分支下的书籍
      { text: "Principles: Life and Work", description: "《原则：生活与工作》", expanded: false },
      // 视频分支下的视频，增加 videoUrl 属性用于嵌入播放
      { text: "The Changing World Order", description: "探讨世界秩序变化的视频", expanded: false, videoUrl: "https://www.youtube.com/embed/VIDEO_ID1" },
      { text: "How the Economic Machine Works", description: "经济运作原理解说视频", expanded: false, videoUrl: "https://www.youtube.com/embed/PHe0bXAIuk0?si=IESRCpxjr5RHV5_1" }
  ],
  connections: [
      [0, 1], [0, 2], [0, 3],
      [1, 4], [1, 5],
      [2, 6],
      [3, 7], [3, 8]
  ]
};
