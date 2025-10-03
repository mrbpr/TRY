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
      color: 'from-sky-500 to-cyan-500',
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
      color: 'from-amber-500 to-orange-500',
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
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-3 block">Our Services</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Complete Support for{' '}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Every Need
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              Professional counseling, crisis intervention, wellness programs, and more—all designed for students navigating the challenges of higher education.
            </p>
            <button
              onClick={() => setShowAssessment(true)}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <PlayIcon className="h-6 w-6" />
              <span>Start Your Assessment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                      {service.availability}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 text-sm text-slate-700">
                        <CheckIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2 block">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Flexible Plans for Every Student</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Affordable mental health support that fits your budget and lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${plan.color} ${
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
      <section className="py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">In Crisis? We're Here Now</h2>
          <p className="text-xl text-rose-100 mb-10 font-light leading-relaxed">
            If you're experiencing a mental health emergency, don't wait. Our crisis support team is standing by 24/7 to help you through this moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:9152987821"
              className="px-10 py-5 bg-white text-rose-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
            >
              Call Crisis Line: 9152987821
            </a>
            <button className="px-10 py-5 border-3 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm bg-white/10">
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