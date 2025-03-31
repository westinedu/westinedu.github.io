window.mindmapData = {
  nodes: [
    // 0: 根节点
    {
      text: "Learning to Meditate",
      description: "Key aspects of beginning and maintaining a meditation practice",
      important: true,
      classic: "Core Elements: Techniques, Benefits, Preparation, Challenges",
      person: "Various Teachers"
    },

    // 1~4: 一级分支
    { text: "Benefits of Meditation", description: "Positive effects on body and mind" },
    { text: "Common Techniques", description: "Popular methods to practice meditation" },
    { text: "Preparation", description: "Set up the right environment and mindset" },
    { text: "Challenges", description: "Common difficulties beginners face" },

    // 5~7: Benefits 下的子节点
    { text: "Stress Reduction", description: "Helps lower cortisol levels, promoting relaxation" },
    { text: "Improved Focus", description: "Enhances concentration and cognitive performance" },
    { text: "Emotional Well-being", description: "Increases self-awareness and emotional stability" },

    // 8~11: Techniques 下的子节点
    { text: "Mindfulness Meditation", description: "Focus on the present moment without judgment" },
    { text: "Transcendental Meditation", description: "Use of a mantra to achieve a relaxed awareness" },
    { text: "Loving-Kindness", description: "Cultivate compassion and goodwill toward oneself and others" },
    { text: "Vipassana", description: "Insight meditation focusing on deep observation of sensations" },

    // 12~15: Preparation 下的子节点
    { text: "Environment", description: "Quiet, comfortable space with minimal distractions" },
    { text: "Posture", description: "Sit upright, spine aligned, or choose a comfortable pose" },
    { text: "Breathing", description: "Slow, deep, rhythmic breathing helps relaxation" },
    { text: "Time of Day", description: "Morning or evening sessions, find a consistent schedule" },

    // 16~19: Challenges 下的子节点
    { text: "Restlessness", description: "Difficulty sitting still or calming the mind" },
    { text: "Inconsistent Practice", description: "Struggle to maintain regular sessions" },
    { text: "Physical Discomfort", description: "Back pain, numb legs, or tension in shoulders" },
    { text: "Mental Chatter", description: "Intrusive thoughts and worries disrupting focus" }
  ],
  connections: [
    // 根节点(0) → 一级分支(1~4)
    [0, 1], [0, 2], [0, 3], [0, 4],

    // Benefits(1) → 5~7
    [1, 5], [1, 6], [1, 7],

    // Common Techniques(2) → 8~11
    [2, 8], [2, 9], [2, 10], [2, 11],

    // Preparation(3) → 12~15
    [3, 12], [3, 13], [3, 14], [3, 15],

    // Challenges(4) → 16~19
    [4, 16], [4, 17], [4, 18], [4, 19]
  ]
};
