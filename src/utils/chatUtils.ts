export const getMentalHealthResponse = (input: string) => {
  // This would be replaced with actual AI processing
  const keywords = {
    anxiety: [
      "I understand anxiety can be overwhelming. Let's explore some calming techniques.",
      "Would you like to try a quick breathing exercise?",
      "What triggers your anxiety? Understanding this can help us manage it better."
    ],
    depression: [
      "I hear you're feeling down. Remember that you're not alone in this.",
      "Have you been able to maintain your daily routines?",
      "Would you like to explore some mood-lifting activities?"
    ],
    stress: [
      "Stress can be challenging to manage. Let's break down what's causing it.",
      "Have you tried any relaxation techniques recently?",
      "Sometimes taking small steps can help reduce overwhelming stress."
    ],
    sleep: [
      "Good sleep is crucial for mental health. How has your sleep pattern been?",
      "Would you like some tips for better sleep hygiene?",
      "Let's work on creating a relaxing bedtime routine."
    ]
  }

  // Simple keyword matching
  for (const [key, responses] of Object.entries(keywords)) {
    if (input.toLowerCase().includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Default responses if no keywords match
  const defaultResponses = [
    "I'm here to listen. Could you tell me more about how you're feeling?",
    "That sounds difficult. How long have you been experiencing this?",
    "Thank you for sharing. Would you like to explore some coping strategies?",
    "I'm here to support you. What would be most helpful right now?"
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
} 