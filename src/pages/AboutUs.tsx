import React from 'react';
import { 
  HeartIcon, 
  AcademicCapIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Clinical Officer',
      credentials: 'PhD in Clinical Psychology',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Specializes in student mental health with 15+ years of experience in higher education counseling.'
    },
    {
      name: 'Michael Chen',
      role: 'Director of Technology',
      credentials: 'MS Computer Science, Mental Health Tech Advocate',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Combines technical expertise with passion for creating accessible mental health solutions.'
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Research Director',
      credentials: 'PhD in Educational Psychology',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Leads our evidence-based approach to digital mental health interventions for students.'
    },
    {
      name: 'James Thompson',
      role: 'Community Outreach Manager',
      credentials: 'MA in Counseling, Peer Support Specialist',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Former student who experienced mental health challenges and now helps others navigate their journey.'
    }
  ];

  const values = [
    {
      icon: HeartIcon,
      title: 'Compassionate Care',
      description: 'We approach every interaction with empathy, understanding, and genuine care for student wellbeing.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy & Security',
      description: 'Your mental health information is protected with the highest standards of confidentiality and security.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: AcademicCapIcon,
      title: 'Evidence-Based',
      description: 'All our tools and interventions are grounded in scientific research and clinical best practices.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Inclusive Community',
      description: 'We create a safe, welcoming space for students of all backgrounds, identities, and experiences.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology and user feedback.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: SparklesIcon,
      title: 'Empowerment',
      description: 'We believe in empowering students with tools and knowledge to take control of their mental health.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                TRY IT
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're dedicated to revolutionizing mental health support for students in higher education 
              through innovative technology, compassionate care, and evidence-based interventions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TRY IT, we believe that every student deserves access to quality mental health support. 
                Our mission is to break down barriers to mental healthcare by providing accessible, 
                affordable, and effective digital solutions tailored specifically for the unique challenges 
                faced by students in higher education.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We understand that the academic journey can be overwhelming, and mental health challenges 
                shouldn't stand in the way of educational success. That's why we've created a comprehensive 
                platform that combines professional support, peer connection, and self-help tools in one 
                secure, user-friendly environment.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Students supporting each other"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <HeartIcon className="h-8 w-8 text-red-500" />
                  <div>
                    <div className="font-bold text-2xl text-gray-900">10,000+</div>
                    <div className="text-sm text-gray-600">Students Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our student community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.color} mb-4`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of mental health professionals, technologists, and advocates 
              are passionate about supporting student wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 mx-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {member.credentials}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            TRY IT was founded in 2020 by a group of mental health professionals and technologists 
            who recognized the urgent need for accessible mental health support in higher education. 
            During the pandemic, we witnessed firsthand how students struggled with isolation, 
            anxiety, and depression while facing unprecedented academic challenges.
          </p>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            What started as a small pilot program at one university has grown into a comprehensive 
            platform serving students across multiple institutions. We've helped over 10,000 students 
            navigate their mental health journeys, and we're just getting started.
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            Today, TRY IT continues to evolve based on student feedback and the latest research in 
            digital mental health. We remain committed to our founding principle: every student 
            deserves access to quality mental health support, regardless of their circumstances.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;