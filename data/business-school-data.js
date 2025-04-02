window.mindmapData = {
  nodes: [
    { text: "0. Business School Courses", description: "Common curriculum structure in top global business schools" },                // 0: 根节点

    { text: "1. Undergraduate Courses", description: "Business courses typically offered at the undergraduate level" },                      // 1
    { text: "2. MBA Courses", description: "Core and elective courses at the MBA and master's level" },                         // 2
    { text: "3. Financial Masters Courses", description: "Curriculum structure for Master's in Finance programs" },                        // 3
    { text: "4. EMBA Courses", description: "Curriculum for Executive MBA programs for senior managers" },                      // 4

    // Undergraduate Courses 下的子节点
    { text: "5. Foundational Courses", description: "Basic courses in business education" },                                // 5
    { text: "6. Advanced/Professional Courses", description: "Advanced and professional-level business courses" },                       // 6

    // Foundational Courses 的子节点
    { text: "7. Microeconomics", description: "Study of individual economic behavior" },                                  // 7
    { text: "8. Macroeconomics", description: "Analysis of the overall national economy" },                                   // 8
    { text: "9. Principles of Accounting", description: "Basic principles of accounting" },                              // 9
    { text: "10. Principles of Marketing", description: "Fundamentals of marketing theory" },                            // 10
    { text: "11. Principles of Management", description: "Foundations of management theory" },                              // 11

    // Advanced/Professional Courses 的子节点
    { text: "12. Financial Markets and Institutions", description: "Functioning of financial markets and institutions" },               // 12
    { text: "13. Operations Management", description: "Design and improvement of production and service systems" },                     // 13
    { text: "14. Business Data Analytics", description: "Collection and analysis of business data" },                         // 14
    { text: "15. International Business", description: "Global strategy and management in multinational corporations" },                        // 15

    // MBA Courses 下的子节点
    { text: "16. Core MBA Courses", description: "Core MBA curriculum" },                                   // 16
    { text: "17. MBA Electives", description: "Elective courses in MBA programs" },                                       // 17

    // Core MBA Courses 的子节点
    { text: "18. Managerial Economics", description: "Economic analysis for business decision-making" },                          // 18
    { text: "19. Organizational Behavior", description: "Study of individual and group behavior within organizations" },                     // 19
    { text: "20. Marketing Management", description: "Strategic planning and practice in marketing" },                               // 20
    { text: "21. Financial Management", description: "Fundamentals of corporate financial management" },                             // 21
    { text: "22. Operations Management (MBA)", description: "MBA-level operations management" },                          // 22
    { text: "23. Strategic Management", description: "Corporate strategy formulation and execution" },                              // 23

    // MBA Electives 的子节点
    { text: "24. Entrepreneurship Management", description: "Entrepreneurial processes and business model design" },                   // 24
    { text: "25. Project Management", description: "Project planning and risk control" },                              // 25
    { text: "26. Supply Chain Management", description: "Design and optimization of supply chains" },                             // 26
    { text: "27. Leadership Development", description: "Leadership training and team management" },                         // 27
    { text: "28. E-commerce", description: "E-commerce models and market trends" },                                   // 28

    // Financial Masters Courses 下的子节点
    { text: "29. Core Courses (Financial Masters)", description: "Core courses for Master's in Finance programs" },                  // 29
    { text: "30. Electives (Financial Masters)", description: "Elective courses in financial master's programs" },                       // 30

    // Core Courses (Financial Masters) 的子节点
    { text: "31. Investment", description: "Investment tools and portfolio theory" },                                     // 31
    { text: "32. Corporate Finance", description: "Corporate financing and investment decisions" },                                // 32
    { text: "33. Financial Markets", description: "Structure and mechanisms of financial markets" },                                // 33
    { text: "34. Econometrics", description: "Application of statistics and mathematical models in finance" },                            // 34
    { text: "35. International Finance", description: "Global financial systems and exchange rate mechanisms" },                         // 35

    // Electives (Financial Masters) 的子节点
    { text: "36. Financial Risk Management", description: "Identification and management of financial risk" },                          // 36
    { text: "37. Fintech", description: "Fintech and blockchain applications" },                                       // 37
    { text: "38. Mergers and Acquisitions", description: "M&A strategies and financial analysis" },                        // 38
    { text: "39. Asset Securitization", description: "Fundamentals of asset securitization" },                              // 39

    // EMBA Courses 下的子节点
    { text: "40. Core Courses (EMBA)", description: "Core EMBA curriculum" },                                  // 40
    { text: "41. Specialized Electives (EMBA)", description: "Specialized and elective courses in EMBA programs" },                     // 41

    // Core Courses (EMBA) 的子节点
    { text: "42. Economic Analysis", description: "Macro and microeconomic analysis" },                                // 42
    { text: "43. Marketing Management (EMBA)", description: "Marketing management at the EMBA level" },                        // 43
    { text: "44. Strategic Management Accounting", description: "Accounting support for strategic decision-making" },                      // 44
    { text: "45. Organizational Behavior (EMBA)", description: "Organizational behavior for EMBA students" },                        // 45
    { text: "46. Operations Management (EMBA)", description: "EMBA-level operations management" },                          // 46

    // Specialized Electives (EMBA) 的子节点
    { text: "47. The Chinese Economy", description: "China’s economic development model and opportunities" },                           // 47
    { text: "48. Leadership Development (EMBA)", description: "Leadership training at the EMBA level" },                        // 48
    { text: "49. Overseas Modules", description: "International exchange and learning modules" },                                  // 49
    { text: "50. Digital Transformation", description: "Corporate transformation in the digital era" }                           // 50
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
