import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'

export const generatePDF = ({ 
  score, 
  summary, 
  recommendations, 
  date,
  additionalRecommendations,
  userName = 'User'
}: { 
  score: number
  summary: string
  recommendations: Array<{
    title: string
    description: string
    priority: string
    category: string
  }>
  date: string
  additionalRecommendations: string[]
  userName?: string
}) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  const timestamp = format(new Date(), "MMMM d, yyyy 'at' h:mm a")

  // Helper function for text wrapping and positioning
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line: string, i: number) => {
      doc.text(line, x, y + (i * lineHeight))
    })
    return y + (lines.length * lineHeight)
  }

  // Helper function to check if we need a new page
  const checkAndAddPage = (currentY: number, neededSpace: number): number => {
    if (currentY + neededSpace > pageHeight - margin) {
      doc.addPage()
      return margin + 20
    }
    return currentY
  }

  // Header
  doc.setFillColor(59, 130, 246)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setFillColor(79, 70, 229)
  doc.rect(0, 40, pageWidth, 10, 'F')

  // Title and User Info
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text('Mental Health Assessment Report', margin, 25)
  
  doc.setFontSize(12)
  doc.text(`Generated for: ${userName}`, margin, 35)
  doc.text(`Generated on: ${timestamp}`, pageWidth - margin - 80, 35, { align: 'right' })

  let yPos = 70

  // Score section
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.text('Assessment Score', margin, yPos)
  
  yPos += 25
  const scoreColor = score < 50 ? '#EF4444' : score < 70 ? '#F59E0B' : '#10B981'
  doc.setFillColor(scoreColor)
  doc.circle(40, yPos, 15, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.text(score.toString(), 35, yPos + 5)

  // Score interpretation
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  const scoreText = score < 50 ? 'Needs Attention' : score < 70 ? 'Moderate' : 'Good'
  doc.text(`Score Status: ${scoreText}`, margin + 40, yPos + 5)

  // Summary section
  yPos = checkAndAddPage(yPos + 40, 60)
  doc.setFontSize(18)
  doc.text('Summary', margin, yPos)
  
  yPos += 10
  doc.setFontSize(12)
  yPos = addWrappedText(summary, margin, yPos, contentWidth, 7)

  // Personalized Action Plan
  yPos = checkAndAddPage(yPos + 20, 40)
  doc.setFontSize(18)
  doc.text('Personalized Action Plan', margin, yPos)
  
  yPos += 15
  recommendations.forEach((rec, index) => {
    yPos = checkAndAddPage(yPos, 40)
    
    // Title with priority indicator
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    const priorityIcon = rec.priority === 'high' ? '⚠ ' : rec.priority === 'medium' ? '• ' : '○ '
    doc.text(`${priorityIcon}${index + 1}. ${rec.title}`, margin, yPos)
    
    // Description
    yPos += 8
    doc.setFontSize(12)
    doc.setTextColor(75, 85, 99)
    yPos = addWrappedText(rec.description, margin + 8, yPos, contentWidth - 16, 6)
    yPos += 10
  })

  // Additional Recommendations
  yPos = checkAndAddPage(yPos + 20, 40)
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text('Additional Recommendations', margin, yPos)
  
  yPos += 15
  doc.setFontSize(12)
  additionalRecommendations.forEach((rec, index) => {
    yPos = checkAndAddPage(yPos, 20)
    yPos = addWrappedText(`${index + 1}. ${rec}`, margin + 5, yPos, contentWidth - 10, 6)
    yPos += 8
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.setTextColor(156, 163, 175)
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }

  return doc
}

// Helper function to get emoji for recommendation
function getEmojiForRecommendation(text: string): string {
  if (text.toLowerCase().includes('exercise')) return '💪'
  if (text.toLowerCase().includes('sleep')) return '😴'
  if (text.toLowerCase().includes('meditation')) return '🧘'
  if (text.toLowerCase().includes('social')) return '👥'
  if (text.toLowerCase().includes('professional')) return '👨‍⚕️'
  if (text.toLowerCase().includes('diet')) return '🥗'
  if (text.toLowerCase().includes('hobby')) return '🎨'
  return '✨'
} 