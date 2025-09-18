import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface HomepageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Homepage: React.FC<HomepageProps> = ({ onOpenAuth }) => {
  const features = [
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: '24/7 Support Chat',
      description: 'Connect with trained mental health professionals anytime you need support.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BookOpenIcon,
      title: 'Educational Resources',
      description: 'Access evidence-based articles, guides, and self-help materials.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ChartBarIcon,
      title: 'Mood Tracking',
      description: 'Monitor your mental health journey with personalized progress tracking.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Appointment Booking',
      description: 'Schedule sessions with licensed counselors and therapists.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy Protected',
      description: 'Your mental health information is completely confidential and secure.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: HeartIcon,
      title: 'Peer Support',
      description: 'Connect with other students in moderated support groups.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Graduate Student',
      content: 'TRY IT helped me manage my anxiety during finals week. The 24/7 chat support was a lifesaver.',
      rating: 5
    },
    {
      name: 'Michael K.',
      role: 'Undergraduate',
      content: 'The mood tracking feature helped me identify patterns in my mental health. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emma L.',
      role: 'PhD Student',
      content: 'Having access to professional counselors through the platform made all the difference in my academic journey.',
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <HeartIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Mental Health{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              TRY IT provides comprehensive digital mental health support designed specifically 
              for students in higher education. Get the help you deserve, when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform offers evidence-based tools and support 
              to help you thrive during your academic journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Making a Real Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our platform has helped thousands of students improve their mental health and academic success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Students Helped' },
              { number: '95%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support Available' },
              { number: '50+', label: 'Licensed Counselors' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from students who've transformed their mental health journey with TRY IT.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Mental Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who have already taken the first step towards better mental health. 
            Your wellbeing is our priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Free Today</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;