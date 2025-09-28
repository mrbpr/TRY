import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'crisis';
  contactPreference: 'email' | 'phone' | 'text';
}

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '1-800-TRYIT-HELP (1-800-879-4843)',
      availability: 'Mon-Fri: 8 AM - 8 PM EST',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Get detailed responses to your questions',
      contact: 'support@tryit-mental.com',
      availability: 'Response within 24 hours',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Live Chat',
      description: '24/7 crisis support and general inquiries',
      contact: 'Available on all pages',
      availability: 'Always available',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Schedule Appointment',
      description: 'Book a session with a licensed counselor',
      contact: 'Online booking system',
      availability: 'Same-day appointments available',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const officeLocations = [
    {
      name: 'Main Campus Office',
      address: '123 University Ave, Student Health Center, Room 205',
      city: 'Campus, ST 12345',
      hours: 'Mon-Fri: 8 AM - 6 PM',
      phone: '(555) 123-4567'
    },
    {
      name: 'Downtown Satellite Office',
      address: '456 Downtown Blvd, Suite 300',
      city: 'City, ST 12345',
      hours: 'Mon-Thu: 10 AM - 7 PM, Fri: 10 AM - 5 PM',
      phone: '(555) 234-5678'
    }
  ];

  const faqs = [
    {
      question: 'Is my information confidential?',
      answer: 'Absolutely. All communications and mental health information are protected under HIPAA and kept completely confidential.'
    },
    {
      question: 'How quickly can I get an appointment?',
      answer: 'We offer same-day crisis appointments and typically schedule regular appointments within 3-5 business days.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major insurance plans. Contact us to verify your specific coverage.'
    },
    {
      question: 'What if I need help outside of business hours?',
      answer: 'Our crisis support chat is available 24/7, and you can always call 988 for immediate crisis support.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to support you every step of the way. Reach out through any of our 
              channels and we'll connect you with the right resources for your needs.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Emergency Alert */}
        <div className="bg-red-500 text-white rounded-2xl p-6 mb-12 text-center">
          <h2 className="text-xl font-bold mb-2">In Crisis? Get Help Now</h2>
          <p className="mb-4">If you're having thoughts of self-harm or suicide, please reach out immediately:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:9152987821"
              className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Call 9152987821 - Suicide Prevention
            </a>
            <a
              href="tel:112"
              className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Call 112 - Emergency
            </a>
            <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
              Start Crisis Chat
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <p className="text-green-700 font-medium">
                    Thank you! We've received your message and will respond within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Choose a subject</option>
                    <option value="general">General Question</option>
                    <option value="appointment">Schedule Appointment</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              {/* Urgency and Contact Preference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    id="urgency"
                    {...register('urgency', { required: 'Please select urgency level' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Need response within 24 hours</option>
                    <option value="high">High - Need response within 4 hours</option>
                    <option value="crisis">Crisis - Need immediate help</option>
                  </select>
                  {errors.urgency && (
                    <p className="text-red-500 text-sm mt-1">{errors.urgency.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method *
                  </label>
                  <select
                    id="contactPreference"
                    {...register('contactPreference', { required: 'Please select contact preference' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Choose method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                  {errors.contactPreference && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPreference.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { required: 'Please enter your message' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Please describe how we can help you..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Methods */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
            
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="font-medium text-blue-600 mb-1">
                        {method.contact}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{method.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Locations</h3>
            <div className="space-y-4">
              {officeLocations.map((location, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow border border-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{location.name}</h4>
                      <p className="text-gray-600 text-sm">{location.address}</p>
                      <p className="text-gray-600 text-sm">{location.city}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{location.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          <span>{location.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <QuestionMarkCircleIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about our services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;