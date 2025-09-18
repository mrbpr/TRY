import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <DocumentTextIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Agreement to Terms</h2>
            <p className="text-blue-800">
              By accessing and using the TRY IT mental health platform, you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. Please read these terms carefully 
              before using our services.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding agreement between you and 
            TRY IT ("we," "us," or "our") regarding your use of our digital mental health platform 
            and related services. By creating an account, accessing our platform, or using any of our 
            services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Services</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Platform Services</h3>
          <p className="mb-4">
            TRY IT provides a comprehensive digital mental health platform specifically designed for 
            students in higher education. Our services include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>24/7 crisis support and intervention services</li>
            <li>Licensed professional counseling and therapy sessions</li>
            <li>Mental health assessments and screening tools</li>
            <li>Educational resources and self-help materials</li>
            <li>Peer support groups and community forums</li>
            <li>Mood tracking and wellness planning tools</li>
            <li>Appointment scheduling and management</li>
            <li>Emergency resource connections</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Professional Services</h3>
          <p className="mb-4">
            Our platform connects you with licensed mental health professionals, including therapists, 
            counselors, and crisis intervention specialists. These professionals are independent 
            contractors who provide clinical services through our platform while maintaining their 
            professional licenses and adhering to applicable ethical guidelines.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Eligibility and Account Registration</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Age Requirements</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>You must be at least 18 years old to use our services</li>
            <li>If you are under 18, you must have parent/guardian consent and supervision</li>
            <li>You must be currently enrolled in or affiliated with a higher education institution</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Responsibilities</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate, complete, and current information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Update your information as needed to maintain accuracy</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Responsibilities and Conduct</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Acceptable Use</h3>
          <p className="mb-4">You agree to use our platform only for lawful purposes and in accordance with these Terms. You will:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide honest and accurate information in all interactions</li>
            <li>Respect the confidentiality of other users</li>
            <li>Follow the guidance and recommendations of mental health professionals</li>
            <li>Use the platform's features as intended</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Prohibited Activities</h3>
          <p className="mb-4">You agree NOT to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Share your account credentials with others</li>
            <li>Use the platform for any illegal or unauthorized purpose</li>
            <li>Harass, abuse, or harm other users or staff</li>
            <li>Share personal information of other users</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the platform to provide unlicensed mental health services</li>
            <li>Upload malicious software or code</li>
            <li>Interfere with the platform's operation or security</li>
            <li>Use the platform for commercial purposes without authorization</li>
          </ul>

          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Situations</h3>
            <p className="text-red-700">
              <strong>IMPORTANT:</strong> If you are experiencing a mental health crisis or have thoughts 
              of self-harm or suicide, do not rely solely on our platform. Call 911, go to your nearest 
              emergency room, or call the National Suicide Prevention Lifeline at 988 immediately.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Clinical Disclaimers and Limitations</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Not Emergency Services</h3>
          <p className="mb-4">
            Our platform is not designed to provide emergency mental health services. While we offer 
            24/7 support, there may be delays in response times. In case of emergency, always contact 
            emergency services directly.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Professional Relationship</h3>
          <p className="mb-4">
            The mental health professionals on our platform maintain independent professional relationships 
            with users. TRY IT facilitates these connections but does not control or direct the clinical 
            decisions made by licensed professionals.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Treatment Limitations</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Our services are not a substitute for in-person mental health care when needed</li>
            <li>Some conditions may require specialized care not available through our platform</li>
            <li>Medication management requires coordination with prescribing physicians</li>
            <li>Crisis situations may require immediate in-person intervention</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Privacy and Confidentiality</h2>
          <p className="mb-4">
            Your privacy is extremely important to us. Please review our Privacy Policy, which details 
            how we collect, use, and protect your personal and health information. Key points include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All communications are encrypted and secure</li>
            <li>We comply with HIPAA and other applicable privacy laws</li>
            <li>Clinical information is kept confidential except as required by law</li>
            <li>You have control over your personal information</li>
            <li>We never sell or share your data for commercial purposes</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Payment Terms and Billing</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Plans</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Basic Plan:</strong> Free access to essential resources and crisis support</li>
            <li><strong>Standard Plan:</strong> Monthly subscription including counseling sessions</li>
            <li><strong>Premium Plan:</strong> Comprehensive access to all services and features</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Billing and Payments</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Subscription fees are billed monthly in advance</li>
            <li>You can cancel your subscription at any time</li>
            <li>Refunds are provided according to our refund policy</li>
            <li>Insurance coverage may be available for qualifying services</li>
            <li>Financial assistance programs are available for eligible students</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Intellectual Property Rights</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Our Content</h3>
          <p className="mb-4">
            All content on the TRY IT platform, including text, graphics, logos, software, and educational 
            materials, is owned by TRY IT or our licensors and is protected by copyright, trademark, and 
            other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">User Content</h3>
          <p className="mb-4">
            You retain ownership of any content you submit through our platform. However, you grant us 
            a limited license to use this content solely for providing our services and improving our platform.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Platform Availability and Modifications</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Availability</h3>
          <p className="mb-4">
            We strive to maintain high availability of our platform, but we cannot guarantee uninterrupted 
            service. Planned maintenance and unexpected downtime may occasionally occur.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Platform Changes</h3>
          <p className="mb-4">
            We reserve the right to modify, update, or discontinue features of our platform at any time. 
            We will provide reasonable notice of significant changes that may affect your use of our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, TRY IT and its affiliates, officers, directors, 
            employees, and agents shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your use of our platform or services.
          </p>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Limitation</h3>
            <p className="text-yellow-700">
              Our total liability for any claim arising from your use of our services will not exceed 
              the amount you have paid us for services in the 12 months preceding the claim.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless TRY IT and its affiliates from any claims, damages, 
            losses, or expenses (including attorneys' fees) arising from your use of our platform, 
            violation of these Terms, or infringement of any third-party rights.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Termination</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Termination by You</h3>
          <p className="mb-4">
            You may terminate your account at any time by contacting our support team or using the 
            account deletion feature in your dashboard. Upon termination, your access to paid services 
            will cease, but you may retain access to basic resources.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Termination by Us</h3>
          <p className="mb-4">
            We may terminate or suspend your account immediately if you violate these Terms, engage in 
            fraudulent activity, or if we determine that continued service would be harmful to you, 
            other users, or our platform.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Informal Resolution</h3>
          <p className="mb-4">
            Before pursuing formal legal action, we encourage you to contact us directly to resolve any 
            disputes. Many concerns can be addressed quickly through direct communication.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Arbitration Agreement</h3>
          <p className="mb-4">
            Any disputes that cannot be resolved informally will be settled through binding arbitration 
            rather than in court, except for claims that may be brought in small claims court.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by the laws of the state where TRY IT is incorporated, without 
            regard to conflict of law principles. Any legal action must be brought in the appropriate 
            courts of that jurisdiction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Changes to Terms</h2>
          <p className="mb-4">
            We may update these Terms from time to time to reflect changes in our services, applicable 
            laws, or business practices. We will notify you of material changes by email or through our 
            platform. Continued use of our services after changes constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. Contact Information</h2>
          <p className="mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-2">
              <li><strong>Email:</strong> legal@tryit-mental.com</li>
              <li><strong>Phone:</strong> 1-800-TRYIT-HELP</li>
              <li><strong>Mail:</strong> TRY IT Legal Department, 123 University Ave, Campus, ST 12345</li>
              <li><strong>Support:</strong> Available through your account dashboard</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Thank You for Using TRY IT</h3>
            <p className="text-blue-800">
              We're honored to be part of your mental health journey. These Terms help ensure a safe, 
              secure, and supportive environment for all our users. If you have any questions or 
              concerns, please don't hesitate to reach out to our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;