export function calculateAnalytics(responses: any[]) {
  // Map questions to their categories more explicitly
  const categoryMap = {
    'overall mood': 'Mood',
    'sleep': 'Sleep',
    'anxiety': 'Anxiety',
    'concentrate': 'Energy',
    'connected': 'Social'
  }

  // Calculate category scores
  const categoryScores = Object.entries(categoryMap).map(([keyword, category]) => {
    const response = responses.find(r => 
      r.question.toLowerCase().includes(keyword)
    )
    return {
      category,
      score: (response?.score || 0) * 20 // Convert to percentage
    }
  })

  // Calculate emotion distribution
  const totalScore = responses.reduce((sum, r) => sum + r.score, 0)
  const avgScore = totalScore / responses.length

  const emotionDistribution = [
    { emotion: 'Calm', value: 0, color: '#3B82F6' },
    { emotion: 'Happy', value: 0, color: '#10B981' },
    { emotion: 'Anxious', value: 0, color: '#F59E0B' },
    { emotion: 'Sad', value: 0, color: '#EF4444' },
    { emotion: 'Neutral', value: 0, color: '#8B5CF6' }
  ]

  // Distribution logic...
  if (avgScore >= 4.5) {
    emotionDistribution[1].value = 50 // Happy
    emotionDistribution[0].value = 30 // Calm
    emotionDistribution[4].value = 20 // Neutral
  } else if (avgScore >= 3.5) {
    emotionDistribution[0].value = 40 // Calm
    emotionDistribution[1].value = 30 // Happy
    emotionDistribution[4].value = 30 // Neutral
  } else if (avgScore >= 2.5) {
    emotionDistribution[4].value = 40 // Neutral
    emotionDistribution[0].value = 30 // Calm
    emotionDistribution[2].value = 30 // Anxious
  } else if (avgScore >= 1.5) {
    emotionDistribution[2].value = 40 // Anxious
    emotionDistribution[4].value = 30 // Neutral
    emotionDistribution[3].value = 30 // Sad
  } else {
    emotionDistribution[3].value = 50 // Sad
    emotionDistribution[2].value = 30 // Anxious
    emotionDistribution[4].value = 20 // Neutral
  }

  return {
    categoryScores,
    emotionDistribution
  }
} 