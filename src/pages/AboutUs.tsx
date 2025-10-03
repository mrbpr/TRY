import React from 'react';
import { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  AcademicCapIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import AdminTeamEditor from '../components/AdminTeamEditor';
import { teamMemberService, TeamMember } from '../lib/supabase';

const AboutUs: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Clinical Officer',
      credentials: 'PhD in Clinical Psychology',
      image_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Specializes in student mental health with 15+ years of experience in higher education counseling.',
      order_index: 1
    },
    {
      name: 'Michael Chen',
      role: 'Director of Technology',
      credentials: 'MS Computer Science, Mental Health Tech Advocate',
      image_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Combines technical expertise with passion for creating accessible mental health solutions.',
      order_index: 2
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Research Director',
      credentials: 'PhD in Educational Psychology',
      image_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Leads our evidence-based approach to digital mental health interventions for students.',
      order_index: 3
    },
    {
      name: 'James Thompson',
      role: 'Community Outreach Manager',
      credentials: 'MA in Counseling, Peer Support Specialist',
      image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Former student who experienced mental health challenges and now helps others navigate their journey.',
      order_index: 4
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Load team members from Supabase on component mount
  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const members = await teamMemberService.getAll();
        if (members.length > 0) {
          setTeamMembers(members);
        }
      } catch (error) {
        console.error('Error loading team members:', error);
        // Keep default team members if Supabase fails
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-3 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                TRY IT
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Revolutionizing mental health support for students through compassionate care, innovative technology, and evidence-based solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-3 block">Our Mission</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Making Mental Health Support Accessible</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At TRY IT, we believe every student deserves quality mental health support without barriers. We're breaking down obstacles to care by providing accessible, affordable, and effective digital solutions designed specifically for the unique challenges of higher education.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                The academic journey can be overwhelming—mental health challenges shouldn't stand in the way of success. Our comprehensive platform combines professional counseling, peer support, and evidence-based self-help tools in one secure, intuitive environment.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Students supporting each other"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl border-2 border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl">
                    <HeartIcon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-3xl text-slate-900">10,000+</div>
                    <div className="text-sm text-slate-600 font-medium">Students Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">What Drives Us Forward</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              These core principles guide every decision we make and shape how we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
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
          
          <AdminTeamEditor
            teamMembers={teamMembers}
            onUpdateTeam={setTeamMembers}
            isAdminMode={isAdminMode}
            onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wide mb-3 block">How We Started</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10">Our Journey</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
            TRY IT was founded in 2020 by mental health professionals and technologists who saw an urgent need for accessible student mental health support. During the pandemic, we witnessed students struggling with isolation, anxiety, and depression while navigating unprecedented academic challenges.
          </p>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
            What began as a small pilot program at one university has evolved into a comprehensive platform serving students across multiple institutions. We've supported over 10,000 students on their mental health journeys—and we're just getting started.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Today, TRY IT continues to grow based on student feedback and cutting-edge research in digital mental health. We remain committed to our founding principle: every student deserves access to quality mental health support, no matter their circumstances.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;