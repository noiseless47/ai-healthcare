import { IconMessage, IconUsers, IconHeart, IconBulb } from '@tabler/icons-react'

export const forumCategories = [
  {
    id: 'general',
    title: 'General Discussion',
    description: 'Open discussions about mental health and well-being',
    icon: IconMessage,
    introPost: {
      title: 'Welcome to General Discussion',
      content: 'This is a space for open conversations about mental health and well-being. Feel free to share your thoughts, ask questions, and support others.',
      author: 'Healthcare AI Team'
    }
  },
  {
    id: 'support',
    title: 'Support Groups',
    description: 'Find and join support groups for specific topics',
    icon: IconUsers,
    introPost: {
      title: 'Welcome to Support Groups',
      content: 'Join our themed support groups where you can connect with others who share similar experiences. Together, we grow stronger.',
      author: 'Healthcare AI Team'
    }
  },
  {
    id: 'success',
    title: 'Success Stories',
    description: 'Share and celebrate your mental health victories',
    icon: IconHeart,
    introPost: {
      title: 'Welcome to Success Stories',
      content: 'This is a space to celebrate progress, share victories, and inspire others. Every step forward matters, no matter how small.',
      author: 'Healthcare AI Team'
    }
  },
  {
    id: 'activities',
    title: 'Group Activities',
    description: 'Join meditation sessions and wellness challenges',
    icon: IconBulb,
    introPost: {
      title: 'Welcome to Group Activities',
      content: 'Participate in guided meditation sessions, wellness challenges, and group exercises. Together, we build healthy habits.',
      author: 'Healthcare AI Team'
    }
  }
] 