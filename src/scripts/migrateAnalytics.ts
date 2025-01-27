import dbConnect from '@/lib/mongoose'
import { Assessment } from '@/lib/models/Assessment'
import { calculateAnalytics } from '@/lib/utils/analytics'

async function migrateAnalytics() {
  await dbConnect()
  
  const assessments = await Assessment.find({ 
    $or: [
      { analytics: { $exists: false } },
      { 'analytics.categoryScores': { $size: 0 } }
    ]
  })
  
  console.log(`Found ${assessments.length} assessments to migrate`)
  
  for (const assessment of assessments) {
    const analytics = calculateAnalytics(assessment.responses)
    assessment.analytics = analytics
    await assessment.save()
    console.log(`Migrated assessment ${assessment._id}`)
  }
  
  console.log('Migration complete')
}

migrateAnalytics()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Migration failed:', error)
    process.exit(1)
  }) 