import React, { useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AssessmentProps {
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: { value: number; label: string }[];
}

const MentalHealthAssessment: React.FC<AssessmentProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 2,
      question: "How often have you had little interest or pleasure in doing things?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 3,
      question: "How often have you felt nervous, anxious, or on edge?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 4,
      question: "How often have you had trouble sleeping or staying asleep?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 5,
      question: "How has your academic performance been affected by stress or emotional difficulties?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Slightly affected" },
        { value: 2, label: "Moderately affected" },
        { value: 3, label: "Severely affected" }
      ]
    },
    {
      id: 6,
      question: "How often do you feel overwhelmed by your responsibilities?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Sometimes" },
        { value: 2, label: "Often" },
        { value: 3, label: "Almost always" }
      ]
    },
    {
      id: 7,
      question: "How satisfied are you with your social relationships and support system?",
      options: [
        { value: 0, label: "Very satisfied" },
        { value: 1, label: "Somewhat satisfied" },
        { value: 2, label: "Somewhat dissatisfied" },
        { value: 3, label: "Very dissatisfied" }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 25) {
      return {
        level: "Low Risk",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Your responses suggest you're managing well overall. Continue with healthy habits and self-care practices.",
        recommendations: [
          "Maintain regular exercise and healthy sleep habits",
          "Continue using your current coping strategies",
          "Consider joining our wellness workshops for additional support"
        ]
      };
    } else if (percentage <= 50) {
      return {
        level: "Moderate Risk",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "You may be experiencing some stress or emotional difficulties that could benefit from additional support.",
        recommendations: [
          "Consider speaking with a counselor about stress management",
          "Explore our self-help resources and guided exercises",
          "Join a peer support group to connect with others"
        ]
      };
    } else {
      return {
        level: "Higher Risk",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Your responses suggest you may be experiencing significant mental health challenges. We strongly recommend seeking professional support.",
        recommendations: [
          "Schedule an appointment with one of our licensed counselors",
          "Consider our crisis support services if you need immediate help",
          "Reach out to trusted friends, family, or campus resources"
        ]
      };
    }
  };

  const results = showResults ? calculateResults() : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Mental Health Assessment
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        answers[currentQuestion] === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion] === option.value
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion] === option.value && (
                            <div className="w-full h-full rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center">
              <div className="mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Assessment Complete
                </h3>
                <p className="text-gray-600">
                  Thank you for taking the time to complete this assessment. Here are your results:
                </p>
              </div>

              {results && (
                <div className={`${results.bgColor} ${results.borderColor} border-2 rounded-lg p-6 mb-6 text-left`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <h4 className={`text-xl font-bold ${results.color}`}>
                      {results.level}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {results.description}
                  </p>
                  <h5 className="font-semibold text-gray-900 mb-2">Recommended Next Steps:</h5>
                  <ul className="space-y-2">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105">
                  Schedule Counseling Session
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close Assessment
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                This assessment is for informational purposes only and does not constitute a medical diagnosis. 
                Please consult with a mental health professional for personalized guidance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;