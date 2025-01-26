import Image from 'next/image'

const applicationsData = [
  {
    title: "Medical Imaging",
    description: "AI-powered analysis of X-rays, MRIs, and CT scans.",
    image: "/images/applications/MI.jpg"
  },
  {
    title: "Virtual Health",
    description: "24/7 AI-powered health assistance and monitoring.",
    image: "/images/applications/VHI.jpeg"
  },
  {
    title: "Predictive Analytics",
    description: "Disease prediction and prevention through data analysis.",
    image: "/images/applications/PA.jpeg"
  },
  {
    title: "Remote Monitoring",
    description: "Continuous patient monitoring through AI systems.",
    image: "/images/applications/RM.jpeg"
  }
]

const Applications = () => {
  return (
    <section id="applications" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {applicationsData.map((app, index) => (
            <div
              key={index}
              className="hover-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors"
              data-aos="fade-up"
            >
              <div className="relative h-40 mb-4">
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">{app.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Applications 