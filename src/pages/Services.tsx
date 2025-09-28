import React, { useState } from 'react';
import { 
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  HeartIcon,
  CheckIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import MentalHealthAssessment from '../components/MentalHealthAssessment';

const Services: React.FC = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');

  const services = [
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: '24/7 Crisis Support',
      description: 'Immediate access to trained mental health professionals during crisis situations.',
      features: [
        'Instant chat support',
        'Crisis intervention protocols',
        'Emergency resource connections',
        'Follow-up care coordination'
      ],
      color: 'from-red-500 to-pink-500',
      availability: 'Always Available'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Professional Counseling',
      description: 'One-on-one sessions with licensed therapists and counselors.',
      features: [
        'Individual therapy sessions',
        'Group therapy options',
        'Specialized student counselors',
        'Flexible scheduling'
      ],
      color: 'from-blue-500 to-indigo-500',
      availability: 'By Appointment'
    },
    {
      icon: ChartBarIcon,
      title: 'Mental Health Assessment',
      description: 'Comprehensive evaluations to understand your mental health needs.',
      features: [
        'Evidence-based screening tools',
        'Personalized recommendations',
        'Progress tracking',
        'Regular check-ins'
      ],
      color: 'from-green-500 to-teal-500',
      availability: 'On Demand'
    },
    {
      icon: BookOpenIcon,
      title: 'Educational Resources',
      description: 'Self-help materials, workshops, and educational content.',
      features: [
        'Interactive workshops',
        'Self-help guides',
        'Video tutorials',
        'Mindfulness exercises'
      ],
      color: 'from-purple-500 to-violet-500',
      availability: 'Always Available'
    },
    {
      icon: HeartIcon,
      title: 'Peer Support Groups',
      description: 'Connect with other students facing similar challenges.',
      features: [
        'Moderated support groups',
        'Anonymous participation',
        'Topic-specific groups',
        'Student-led initiatives'
      ],
      color: 'from-pink-500 to-rose-500',
      availability: 'Scheduled Sessions'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Wellness Planning',
      description: 'Personalized plans to maintain and improve your mental health.',
      features: [
        'Custom wellness plans',
        'Goal setting and tracking',
        'Habit formation tools',
        'Progress monitoring'
      ],
      color: 'from-orange-500 to-yellow-500',
      availability: 'Ongoing'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'Always',
      description: 'Essential mental health support for all students',
      features: [
        'Crisis support chat',
        'Basic educational resources',
        'Community support groups',
        'Mental health screening',
        'Wellness tips and articles'
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      popular: false
    },
    {
      name: 'Standard',
      price: '$29',
      period: 'per month',
      description: 'Comprehensive support with professional counseling',
      features: [
        'Everything in Basic',
        '4 counseling sessions per month',
        'Personalized wellness plans',
        'Priority chat support',
        'Advanced progress tracking',
        'Workshop access'
      ],
      color: 'border-blue-500',
      buttonColor: 'bg-blue-500 text-white hover:bg-blue-600',
      popular: true
    },
    {
      name: 'Premium',
      price: '$49',
      period: 'per month',
      description: 'Unlimited access to all features and services',
      features: [
        'Everything in Standard',
        'Unlimited counseling sessions',
        'Specialized therapy programs',
        '1-on-1 crisis counselor',
        'Family therapy sessions',
        'Prescription medication support'
      ],
      color: 'border-purple-500',
      buttonColor: 'bg-purple-500 text-white hover:bg-purple-600',
      popular: false
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Mental Health{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              From crisis support to ongoing therapy, we offer a full spectrum of mental health 
              services designed specifically for the unique needs of students in higher education.
            </p>
            <button
              onClick={() => setShowAssessment(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
            >
              <PlayIcon className="h-5 w-5" />
              <span>Take Free Assessment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {service.availability}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe mental health support should be accessible to all students. 
              Choose the plan that best fits your needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${plan.color} ${
                  plan.popular ? 'scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonColor}`}
                    onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                  >
                    {plan.name === 'Basic' ? 'Get Started Free' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              All plans include a 30-day satisfaction guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Support CTA */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Support?</h2>
          <p className="text-xl text-red-100 mb-8">
            If you're experiencing a mental health crisis, don't wait. 
            Our crisis support team is available 24/7 to help you through difficult moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9152987821"
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
            >
              Call Suicide Prevention: 9152987821
            </a>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105">
              Start Crisis Chat
            </button>
          </div>
        </div>
      </section>

      {/* Mental Health Assessment Modal */}
      {showAssessment && (
        <MentalHealthAssessment onClose={() => setShowAssessment(false)} />
      )}
    </div>
  );
};

export default Services;