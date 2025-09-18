import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <ShieldCheckIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Privacy is Our Priority</h2>
            <p className="text-blue-800">
              At TRY IT, we understand that your mental health information is deeply personal and sensitive. 
              This Privacy Policy explains how we collect, use, protect, and share your information in compliance 
              with HIPAA and other applicable privacy laws.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, phone number, and date of birth</li>
            <li>University or educational institution information</li>
            <li>Emergency contact information</li>
            <li>Insurance information (if applicable)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Health Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Mental health assessments and screening results</li>
            <li>Therapy session notes and treatment plans</li>
            <li>Mood tracking data and wellness goals</li>
            <li>Communication with counselors and support staff</li>
            <li>Crisis intervention records</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technical Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Usage patterns and platform interactions</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Treatment and Care</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing mental health services and counseling</li>
            <li>Developing personalized treatment plans</li>
            <li>Monitoring your progress and wellness goals</li>
            <li>Coordinating care between different providers</li>
            <li>Emergency response and crisis intervention</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Platform Operations</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account management and authentication</li>
            <li>Appointment scheduling and reminders</li>
            <li>Payment processing and billing</li>
            <li>Customer support and technical assistance</li>
            <li>Platform security and fraud prevention</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Research and Improvement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Analyzing treatment effectiveness (anonymized data only)</li>
            <li>Improving our services and platform features</li>
            <li>Research studies (with explicit consent)</li>
            <li>Quality assurance and training</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing and Disclosure</h2>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700">
              We will never sell your personal or health information to third parties. We only share 
              information as necessary for your care, as required by law, or with your explicit consent.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">When We May Share Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
            <li><strong>For Treatment:</strong> With other healthcare providers involved in your care</li>
            <li><strong>Legal Requirements:</strong> When required by court orders or legal processes</li>
            <li><strong>Safety Concerns:</strong> To prevent imminent harm to you or others</li>
            <li><strong>Service Providers:</strong> With trusted partners who help us operate the platform (under strict privacy agreements)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security and Protection</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technical Safeguards</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>End-to-end encryption for all sensitive communications</li>
            <li>Secure, HIPAA-compliant cloud infrastructure</li>
            <li>Multi-factor authentication for all accounts</li>
            <li>Regular security audits and penetration testing</li>
            <li>Automatic session timeouts and secure logout</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Administrative Safeguards</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Role-based access controls for staff members</li>
            <li>Regular privacy and security training</li>
            <li>Background checks for all personnel</li>
            <li>Incident response and breach notification procedures</li>
            <li>Regular policy reviews and updates</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights and Controls</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Access and Control</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> View and download your personal and health information</li>
            <li><strong>Correction:</strong> Request corrections to inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
            <li><strong>Portability:</strong> Transfer your data to another service provider</li>
            <li><strong>Restrictions:</strong> Limit how we use or share your information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Communication Preferences</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Opt-out of non-essential communications</li>
            <li>Choose how you receive appointment reminders</li>
            <li>Control marketing and promotional messages</li>
            <li>Set emergency contact preferences</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
          <p className="mb-4">
            We retain your information only as long as necessary for the purposes outlined in this policy:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Active Accounts:</strong> Information is retained while your account is active</li>
            <li><strong>Inactive Accounts:</strong> Data is anonymized or deleted after 3 years of inactivity</li>
            <li><strong>Legal Requirements:</strong> Some records may be retained longer if required by law</li>
            <li><strong>Research Data:</strong> Anonymized data may be retained for research purposes</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to improve your experience:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand platform usage</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access</li>
          </ul>
          <p className="mb-4">
            You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Our services are designed for individuals 18 years and older. We do not knowingly collect 
            personal information from children under 18. If we discover that we have collected information 
            from a child under 18, we will delete that information promptly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be processed and stored in countries other than your own. We ensure 
            that all international transfers comply with applicable privacy laws and include appropriate 
            safeguards to protect your information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by email or through the platform. The updated policy will be effective immediately 
            upon posting unless otherwise specified.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-2">
              <li><strong>Email:</strong> privacy@tryit-mental.com</li>
              <li><strong>Phone:</strong> 1-800-TRYIT-HELP</li>
              <li><strong>Mail:</strong> TRY IT Privacy Officer, 123 University Ave, Campus, ST 12345</li>
              <li><strong>Online:</strong> Contact form available in your account dashboard</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Trust Matters</h3>
            <p className="text-blue-800">
              We are committed to maintaining the highest standards of privacy and security for your 
              mental health information. If you have any concerns about how your information is being 
              handled, please don't hesitate to reach out to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;