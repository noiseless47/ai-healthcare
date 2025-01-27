# AI Healthcare - Mental Health Support Platform

An AI-powered mental health platform providing personalized assessments, real-time support, and progress tracking to help users manage their mental well-being.

![AI Healthcare Platform](public/images/preview.png)

## Key Features

- 🤖 **AI Chat Support**: 24/7 mental health support powered by advanced AI
- 📊 **Mental Health Assessments**: Personalized evaluations and insights
- 📈 **Progress Tracking**: Monitor your mental health journey
- 🔒 **Secure & Private**: Enterprise-grade security for your data
- 🌙 **Dark Mode**: Comfortable viewing experience
- 📱 **Fully Responsive**: Works seamlessly on all devices

## Quick Start

### Prerequisites

```bash
Node.js 18+
MongoDB
Google OAuth credentials
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-healthcare.git
cd ai-healthcare
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Deployment**: Vercel
- **UI Components**: Framer Motion
- **Charts**: Recharts
- **PDF Generation**: jsPDF

## Core Features

### Mental Health Assessment
- Comprehensive questionnaires
- Instant results and insights
- Downloadable PDF reports
- Progress tracking over time

### AI Chat Support
- Real-time emotional support
- Context-aware responses
- Privacy-focused conversations
- 24/7 availability

### User Dashboard
- Mental health progress tracking
- Assessment history
- Personalized recommendations
- Profile management

## Deployment

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aihealthcare.com or open an issue in this repository.
