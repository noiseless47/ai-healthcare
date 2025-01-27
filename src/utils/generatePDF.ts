import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const generatePDF = (data: {
  score: number
  summary: string
  recommendations: Array<{
    title: string
    description: string
    priority: string
  }>
  date: string
}) => {
  const doc = new jsPDF()
  
  // Add logo or header image (if you have one)
  // doc.addImage('/images/logo.png', 'PNG', 20, 10, 30, 30)

  // Title Section with background
  doc.setFillColor(59, 130, 246) // Blue background
  doc.rect(0, 0, 220, 40, 'F')
  doc.setTextColor(255, 255, 255) // White text
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.text('Mental Health Assessment Report', 105, 25, { align: 'center' })

  // Date and Reference
  doc.setTextColor(107, 114, 128) // Gray text
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated on: ${data.date}`, 105, 45, { align: 'center' })
  doc.text(`Reference: MH-${Date.now().toString().slice(-6)}`, 105, 50, { align: 'center' })

  // Score Section with visual indicator
  doc.setDrawColor(59, 130, 246) // Blue border
  doc.setFillColor(240, 249, 255) // Light blue background
  doc.roundedRect(20, 60, 170, 40, 3, 3, 'FD')
  
  doc.setTextColor(31, 41, 55) // Dark text
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Assessment Score', 30, 75)
  
  // Score circle
  const scoreColor = data.score < 50 ? [239, 68, 68] : // red
                    data.score < 70 ? [245, 158, 11] : // yellow
                    [34, 197, 94] // green
  
  doc.setFillColor(...scoreColor)
  doc.circle(160, 80, 15, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.text(data.score.toString(), 160, 80, { align: 'center' })

  // Summary Section
  doc.setTextColor(31, 41, 55)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Assessment Summary', 20, 120)
  
  doc.setFillColor(249, 250, 251) // Light gray background
  doc.roundedRect(20, 130, 170, 40, 3, 3, 'F')
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const splitSummary = doc.splitTextToSize(data.summary, 160)
  doc.text(splitSummary, 25, 140)

  // Recommendations Section
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Personalized Recommendations', 20, 190)

  const recommendationsBody = data.recommendations.map(rec => [
    rec.title,
    rec.description,
    rec.priority.toUpperCase()
  ])

  // Custom table styling
  doc.autoTable({
    startY: 200,
    head: [['Recommendation', 'Description', 'Priority']],
    body: recommendationsBody,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 8
    },
    bodyStyles: {
      fontSize: 10,
      textColor: 60,
      cellPadding: 6
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 100 },
      2: { cellWidth: 30, halign: 'center' }
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251]
    },
    didDrawCell: (data) => {
      // Add priority color indicators
      if (data.section === 'body' && data.column.index === 2) {
        const priority = data.cell.text[0].toLowerCase()
        const color = priority === 'high' ? [239, 68, 68] : // red
                     priority === 'medium' ? [245, 158, 11] : // yellow
                     [34, 197, 94] // green
        
        doc.setFillColor(...color)
        doc.circle(
          data.cell.x + 5,
          data.cell.y + data.cell.height / 2,
          2,
          'F'
        )
      }
    }
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFontSize(8)
  doc.setTextColor(156, 163, 175)
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(
      `Page ${i} of ${pageCount} | AI Healthcare Mental Health Assessment`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    )
  }

  return doc
} 