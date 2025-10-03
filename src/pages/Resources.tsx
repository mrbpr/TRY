import React, { useState, useMemo } from 'react';
import { 
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlayIcon,
  DocumentTextIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'guide' | 'exercise';
  category: 'anxiety' | 'depression' | 'stress' | 'relationships' | 'academic' | 'self-care';
  description: string;
  duration: string;
  views: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: 1,
      title: "Managing Test Anxiety: Evidence-Based Strategies",
      type: "article",
      category: "anxiety",
      description: "Learn proven techniques to reduce test anxiety and improve your academic performance during exams.",
      duration: "8 min read",
      views: 2847,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Mindfulness for Students: 10-Minute Daily Practice",
      type: "video",
      category: "stress",
      description: "A guided mindfulness session designed specifically for busy students to reduce stress and improve focus.",
      duration: "10 min",
      views: 5621,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Understanding Depression: A Comprehensive Guide for Students",
      type: "guide",
      category: "depression",
      description: "Everything you need to know about depression, including symptoms, treatment options, and campus resources.",
      duration: "15 min read",
      views: 3924,
      difficulty: "intermediate",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Progressive Muscle Relaxation Exercise",
      type: "exercise",
      category: "stress",
      description: "Step-by-step guide to progressive muscle relaxation to help reduce physical tension and anxiety.",
      duration: "12 min",
      views: 1892,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Building Healthy Relationships in College",
      type: "article",
      category: "relationships",
      description: "Tips for forming meaningful connections and maintaining healthy relationships during your college years.",
      duration: "6 min read",
      views: 2156,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Time Management for Academic Success",
      type: "video",
      category: "academic",
      description: "Learn effective time management strategies to balance academics, work, and personal life.",
      duration: "18 min",
      views: 4789,
      difficulty: "intermediate",
      image: "https://images.pexels.com/photos/5428270/pexels-photo-5428270.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 7,
      title: "Self-Care Routine: Your 30-Day Challenge",
      type: "guide",
      category: "self-care",
      description: "A month-long self-care program with daily activities to improve your mental and physical wellbeing.",
      duration: "20 min read",
      views: 6834,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 8,
      title: "Breathing Exercises for Anxiety Relief",
      type: "exercise",
      category: "anxiety",
      description: "Simple yet effective breathing techniques you can use anywhere to manage anxiety symptoms.",
      duration: "5 min",
      views: 3467,
      difficulty: "beginner",
      image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 9,
      title: "Overcoming Perfectionism in Academic Settings",
      type: "article",
      category: "academic",
      description: "Understand how perfectionism can impact mental health and learn strategies to develop a healthier mindset.",
      duration: "12 min read",
      views: 2741,
      difficulty: "advanced",
      image: "https://images.pexels.com/photos/5428832/pexels-photo-5428832.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 10,
      title: "Cognitive Behavioral Techniques for Students",
      type: "video",
      category: "depression",
      description: "Introduction to CBT techniques that can help manage negative thought patterns and improve mood.",
      duration: "25 min",
      views: 1954,
      difficulty: "advanced",
      image: "https://images.pexels.com/photos/5327648/pexels-photo-5327648.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: BookOpenIcon },
    { value: 'anxiety', label: 'Anxiety', icon: HeartIcon },
    { value: 'depression', label: 'Depression', icon: HeartIcon },
    { value: 'stress', label: 'Stress Management', icon: HeartIcon },
    { value: 'relationships', label: 'Relationships', icon: HeartIcon },
    { value: 'academic', label: 'Academic Success', icon: AcademicCapIcon },
    { value: 'self-care', label: 'Self-Care', icon: HeartIcon }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'guide', label: 'Guides' },
    { value: 'exercise', label: 'Exercises' }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return DocumentTextIcon;
      case 'video': return PlayIcon;
      case 'guide': return BookOpenIcon;
      case 'exercise': return HeartIcon;
      default: return DocumentTextIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'guide': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-3 block">Resource Library</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Your Mental Health{' '}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Toolkit
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              Evidence-based articles, guided exercises, educational videos, and comprehensive guides to support your wellness journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm font-medium"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm font-medium"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-slate-700 font-semibold">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <FunnelIcon className="h-5 w-5" />
              <span className="font-medium">Filtered by: {selectedCategory !== 'all' ? categories.find(c => c.value === selectedCategory)?.label + ', ' : ''}{selectedType !== 'all' ? types.find(t => t.value === selectedType)?.label : 'All'}</span>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            
            return (
              <div
                key={resource.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-slate-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <TypeIcon className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {resource.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{resource.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    {resource.type === 'video' ? 'Watch Now' :
                     resource.type === 'exercise' ? 'Start Exercise' : 'Read More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Emergency Resources */}
        <div className="mt-20 bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          </div>
          <div className="text-center relative">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Need Immediate Help?</h2>
            <p className="text-rose-100 mb-10 text-lg font-light">
              If you're in crisis or need immediate support, these resources are available 24/7:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="tel:9152987821"
                className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-all duration-200 shadow-xl hover:scale-105 transform"
              >
                Suicide Prevention: 9152987821
              </a>
              <a
                href="tel:112"
                className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-all duration-200 shadow-xl hover:scale-105 transform"
              >
                Emergency: 112
              </a>
              <button className="bg-rose-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-rose-800 transition-all duration-200 shadow-xl hover:scale-105 transform border-2 border-white/30">
                Crisis Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;