const sendMessage = async (message: string) => {
  try {
    // Save user message
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sender: 'user'
      })
    })

    // Get AI response
    const aiResponse = await // ... your AI logic ...

    // Save AI response
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: aiResponse,
        sender: 'ai'
      })
    })
  } catch (error) {
    console.error('Failed to save chat message:', error)
  }
} 