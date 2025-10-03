import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowRightIcon,
  StarIcon,
  SparklesIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface HomepageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Homepage: React.FC<HomepageProps> = ({ onOpenAuth }) => {
  const features = [
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Instant Support',
      description: 'Get immediate help from our trained professionals whenever you need it most.',
      color: 'from-sky-500 to-cyan-500'
    },
    {
      icon: BookOpenIcon,
      title: 'Learn & Grow',
      description: 'Access curated resources to understand and manage your mental wellbeing.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: AcademicCapIcon,
      title: 'Expert Guidance',
      description: 'Work with licensed therapists who understand student life challenges.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Community',
      description: 'Join safe spaces to share experiences with peers who understand.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Complete Privacy',
      description: 'Every conversation is confidential and protected by the highest security.',
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: SparklesIcon,
      title: 'Personal Growth',
      description: 'Track your progress and celebrate milestones on your wellness journey.',
      color: 'from-violet-500 to-purple-500'
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
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <SparklesIcon className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-medium text-slate-700">Your wellbeing journey starts here</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              Mental Health Support
              <br />
              <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Built for Students
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Access professional counseling, peer support, and wellness tools designed specifically for the unique challenges of student life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onOpenAuth('register')}
                className="group px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/services"
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Support That Adapts to You
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              From crisis intervention to daily wellness tools, everything you need is here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Trusted by Students Everywhere
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
              Join a growing community that's prioritizing mental health and academic success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Students Supported' },
              { number: '95%', label: 'Would Recommend' },
              { number: '24/7', label: 'Always Available' },
              { number: '50+', label: 'Expert Counselors' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Stories of Growth & Healing
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Hear from students who found their path to wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="absolute top-6 right-6 opacity-10">
                  <svg className="w-16 h-16 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                  {testimonial.content}
                </p>
                <div className="border-t border-slate-200 pt-6">
                  <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm font-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Take the First Step Today
          </h2>
          <p className="text-xl text-cyan-100 mb-12 leading-relaxed font-light">
            Join thousands of students who are transforming their mental health journey. Your wellbeing matters, and we're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onOpenAuth('register')}
              className="group px-10 py-5 bg-white text-sky-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-3"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/contact"
              className="px-10 py-5 border-3 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-sky-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm bg-white/10"
            >
              Talk to Someone
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;