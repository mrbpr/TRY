import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleBottomCenterTextIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  MinusIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'assessment' | 'crisis' | 'general' | 'resource';
}

interface PsychologicalResponse {
  response: string;
  type: 'assessment' | 'crisis' | 'general' | 'resource';
  followUp?: string[];
  resources?: string[];
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm ARIA (AI Responsive Intelligence Assistant), your AI-powered mental health companion. I'm trained on psychological databases and evidence-based therapeutic approaches. I'm here to provide support, guidance, and resources tailored for students in India. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<{
    mood?: string;
    concerns?: string[];
    riskLevel?: 'low' | 'moderate' | 'high' | 'crisis';
    sessionHistory?: string[];
  }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Psychological knowledge base and response patterns
  const psychologicalDatabase = {
    crisisKeywords: [
      'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm', 'cutting',
      'overdose', 'jump', 'die', 'death', 'hopeless', 'worthless', 'can\'t go on',
      'no point', 'better off dead', 'harm', 'violence', 'ending life', 'give up'
    ],
    anxietyKeywords: [
      'anxious', 'anxiety', 'panic', 'worried', 'stress', 'nervous', 'overwhelmed',
      'racing thoughts', 'can\'t breathe', 'heart racing', 'sweating', 'trembling',
      'fear', 'phobia', 'social anxiety', 'exam anxiety', 'performance anxiety',
      'restless', 'tense', 'on edge'
    ],
    depressionKeywords: [
      'depressed', 'depression', 'sad', 'empty', 'numb', 'lonely', 'isolated',
      'tired', 'exhausted', 'no energy', 'can\'t sleep', 'sleeping too much',
      'no appetite', 'eating too much', 'guilty', 'shame', 'failure', 'hopeless'
    ],
    academicKeywords: [
      'studies', 'exam', 'grades', 'academic', 'college', 'university', 'pressure',
      'performance', 'failing', 'procrastination', 'concentration', 'focus',
      'assignment', 'deadline', 'competition', 'career', 'future', 'jee', 'neet'
    ],
    relationshipKeywords: [
      'relationship', 'friends', 'family', 'partner', 'boyfriend', 'girlfriend',
      'breakup', 'conflict', 'argument', 'trust', 'communication', 'social',
      'rejection', 'abandonment', 'betrayal', 'parents', 'expectations'
    ]
  };

  const aiPsychologicalResponses = {
    crisis: [
      "I'm deeply concerned about what you're sharing, and I want you to know that your life has immense value. What you're feeling right now is temporary, even though it may not feel that way. Please reach out for immediate help:\n\n🆘 **Emergency Contacts:**\n• National Suicide Prevention: 9152987821\n• AASRA: 9820466726\n• Vandrevala Foundation: 9999666555\n• Emergency Services: 112\n\nAre you in a safe place right now? Can you tell me if there's someone nearby who can stay with you?",
      
      "I hear the tremendous pain you're experiencing, and I want you to know that you're not alone. Crisis support is available 24/7. Please contact:\n\n📞 **Immediate Help:**\n• NIMHANS Mental Health: 080-46110007\n• National Helpline: 9152987821\n• Emergency: 112\n\nYour feelings are valid, but there are people trained to help you through this. Can we talk about what's making you feel this way while you reach out for professional support?",
      
      "What you're going through right now feels overwhelming, but please know that suicidal thoughts are a symptom of emotional pain, not a solution. There is help available:\n\n🔗 **Crisis Resources:**\n• Suicide Prevention Helpline: 9152987821\n• AASRA (24/7): 9820466726\n• Vandrevala Foundation: 9999666555\n\nCan you promise me you'll reach out to one of these numbers? Your life matters, and there are people who want to help you find a way through this pain."
    ],
    
    anxiety: [
      "I understand you're feeling anxious right now, and that can be really overwhelming. Anxiety is your body's natural response to stress, and what you're experiencing is valid. Let's try a grounding technique together:\n\n🌟 **5-4-3-2-1 Technique:**\n• Name 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nThis helps bring your mind back to the present moment. Can you tell me what specific situation is triggering these anxious feelings?",
      
      "Anxiety can make everything feel urgent and overwhelming, but you're safe right now. Let's focus on regulating your nervous system:\n\n🫁 **Box Breathing:**\n• Breathe in for 4 counts\n• Hold for 4 counts\n• Breathe out for 4 counts\n• Hold empty for 4 counts\n• Repeat 4-6 times\n\nThis activates your parasympathetic nervous system and helps calm anxiety. What thoughts are going through your mind right now? Sometimes anxiety creates 'what if' scenarios that feel very real.",
      
      "I can sense the anxiety you're experiencing, and I want you to know that anxiety, while uncomfortable, is not dangerous. Your body is trying to protect you, but sometimes our alarm system is a bit too sensitive.\n\n🧘 **Mindful Awareness:**\n• Notice the anxiety without fighting it\n• Remind yourself: 'This feeling will pass'\n• Focus on your feet touching the ground\n• Take slow, deep breaths\n\nWhat specific situation or thought pattern tends to trigger your anxiety? Understanding your triggers can help us develop better coping strategies."
    ],
    
    depression: [
      "Thank you for sharing how you're feeling with me. Depression can make everything feel heavy and difficult, and I want you to know that what you're experiencing is real and valid. You've shown incredible strength by reaching out.\n\n💙 **Gentle Reminders:**\n• Your feelings are temporary, even when they don't feel that way\n• Small steps count as progress\n• You deserve compassion, especially from yourself\n\nHave you been able to do any small self-care activities today? Even something as simple as drinking water or taking a shower can be a victory when you're struggling.",
      
      "I hear that you're going through a really difficult time with low mood and energy. Depression affects many students, and it's important to know that it's treatable and you can feel better with the right support.\n\n🌱 **Small Steps Matter:**\n• Getting out of bed is an achievement\n• Eating a meal nourishes your body and mind\n• Reaching out (like you're doing now) shows courage\n\nWhat's one very small thing you could do for yourself today? It doesn't have to be big - even opening a window for fresh air or listening to one song you like can help.",
      
      "Depression can make it hard to see hope or imagine feeling better, but recovery is absolutely possible. You've taken an important step by talking about how you're feeling.\n\n🤝 **Building Support:**\n• Do you have friends, family, or counselors you trust?\n• Have you considered speaking with a mental health professional?\n• Are there any activities that used to bring you joy?\n\nRemember, depression often lies to us about our worth and our future. You matter, and your life has value beyond what depression is telling you right now."
    ],
    
    academic: [
      "Academic pressure can feel overwhelming, especially in India's competitive educational environment. I want you to know that your worth as a person is not determined by your grades or academic performance.\n\n📚 **Perspective Check:**\n• You are more than your academic achievements\n• Struggling academically doesn't mean you're failing as a person\n• Many successful people faced academic challenges\n\nWhat specific academic challenges are you facing right now? Is it exam stress, time management, concentration issues, or something else? Let's break it down together.",
      
      "The academic pressure in Indian education can be intense, and it's completely understandable that you're feeling stressed. Competition, family expectations, and future uncertainty can create a perfect storm of anxiety.\n\n🎯 **Coping Strategies:**\n• Break large tasks into smaller, manageable steps\n• Set realistic daily goals rather than overwhelming yourself\n• Remember that one exam or grade doesn't define your entire future\n• Practice self-compassion when you make mistakes\n\nAre you dealing with specific subjects, exam anxiety, or more general academic overwhelm? What kind of pressure are you feeling most - internal or external?",
      
      "Academic stress is one of the leading causes of mental health challenges among Indian students. The pressure to perform, whether for JEE, NEET, board exams, or university studies, can feel crushing.\n\n⚖️ **Finding Balance:**\n• Your mental health is as important as your grades\n• Taking breaks actually improves performance\n• Seeking help is a sign of wisdom, not weakness\n• There are multiple paths to success in life\n\nWhat's the most stressful aspect of your studies right now? Are you getting enough sleep and taking care of your basic needs while studying?"
    ],
    
    general: [
      "I'm really glad you reached out today. Taking care of your mental health is just as important as taking care of your physical health, and it takes courage to start this conversation.\n\n🌟 **You're in the right place for:**\n• Emotional support and validation\n• Coping strategies and techniques\n• Understanding your feelings better\n• Connecting with resources when needed\n\nWhat's been on your mind lately? I'm here to listen without judgment and help you work through whatever you're experiencing.",
      
      "Thank you for trusting me with your thoughts and feelings. Everyone deserves support for their mental health, and I'm honored to be part of your support system today.\n\n💭 **We can explore:**\n• What you're feeling and why\n• Healthy coping strategies\n• Ways to build resilience\n• When and how to seek additional help\n\nWhat would be most helpful for you to talk about right now? There's no pressure - we can go at whatever pace feels comfortable for you.",
      
      "I appreciate you taking this step to prioritize your mental wellbeing. In a world that often tells us to 'just be positive' or 'get over it,' reaching out for support shows real self-awareness and strength.\n\n🤗 **This is a safe space where:**\n• Your feelings are valid and heard\n• There's no judgment, only understanding\n• We focus on what helps you feel better\n• You're in control of what you share\n\nHow have you been feeling lately? What's been weighing on your mind or heart?"
    ]
  };

  const cbtTechniques = {
    thoughtChallenging: [
      "I notice you're having some really difficult thoughts. Let's examine this together using a technique from Cognitive Behavioral Therapy:\n\n🔍 **Thought Examination:**\n• What evidence supports this thought?\n• What evidence contradicts it?\n• What would you tell a close friend having this same thought?\n• Is there a more balanced way to view this situation?\n\nSometimes our minds can be our harshest critics. What would a more compassionate, realistic perspective sound like?",
      
      "That sounds like a challenging thought pattern you're dealing with. Our thoughts aren't always facts, even when they feel very real and convincing.\n\n🧠 **Cognitive Restructuring:**\n• Is this thought helpful or harmful to you?\n• How accurate is this thought really?\n• What's the most realistic way to think about this?\n• How might someone who cares about you view this situation?\n\nCan you help me understand what makes this thought feel so powerful or convincing to you right now?"
    ],
    
    behavioralActivation: [
      "When we're struggling emotionally, we often withdraw from activities that usually help us feel better. This is completely natural, but it can sometimes make us feel worse over time.\n\n🌟 **Gentle Activity Planning:**\n• What's one small activity that used to bring you satisfaction?\n• Could you try a tiny version of that today?\n• What activities align with your values, even in small ways?\n• What would feel manageable right now?\n\nRemember, we're not aiming for perfection - just small steps toward activities that might help you feel a little bit better.",
      
      "Sometimes when we're down, our instinct is to isolate and avoid activities. While rest is important, gentle engagement can help improve our mood.\n\n🎯 **Behavioral Activation:**\n• What activities used to bring you joy or accomplishment?\n• What's one small thing you could do today that connects you to your values?\n• Could you do something creative, physical, or social - even in a tiny way?\n\nWhat feels most realistic for you right now? We can start incredibly small - even a 5-minute walk or listening to one favorite song counts."
    ],
    
    mindfulness: [
      "Let's practice mindfulness together. This can help ground you in the present moment and create some space between you and difficult thoughts or feelings.\n\n🧘 **Mindful Breathing:**\n• Notice your breath without trying to change it\n• What do you observe about your breathing right now?\n• Can you feel the air entering and leaving your nostrils?\n• Notice if your mind wanders, and gently bring attention back to your breath\n\nMindfulness isn't about stopping thoughts - it's about changing your relationship with them. How does it feel to focus on your breath right now?",
      
      "Mindfulness can be a powerful tool for managing difficult emotions and thoughts. Let's try a body awareness exercise:\n\n🌊 **Body Scan:**\n• Starting from the top of your head, slowly notice each part of your body\n• What sensations do you notice? Tension, warmth, coolness?\n• Don't try to change anything, just observe with curiosity\n• If you notice tension, breathe into that area\n\nWhat do you notice in your body right now? Sometimes our bodies hold emotions and stress in ways we're not fully aware of."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const analyzeUserInput = (input: string): PsychologicalResponse => {
    const lowerInput = input.toLowerCase();
    
    // Crisis detection
    const hasCrisisKeywords = psychologicalDatabase.crisisKeywords.some(keyword => 
      lowerInput.includes(keyword)
    );
    
    if (hasCrisisKeywords) {
      setUserContext(prev => ({ ...prev, riskLevel: 'crisis' }));
      return {
        response: aiPsychologicalResponses.crisis[Math.floor(Math.random() * aiPsychologicalResponses.crisis.length)],
        type: 'crisis'
      };
    }

    // Anxiety detection
    const hasAnxietyKeywords = psychologicalDatabase.anxietyKeywords.some(keyword => 
      lowerInput.includes(keyword)
    );
    
    if (hasAnxietyKeywords) {
      setUserContext(prev => ({ ...prev, mood: 'anxious', concerns: [...(prev.concerns || []), 'anxiety'] }));
      return {
        response: aiPsychologicalResponses.anxiety[Math.floor(Math.random() * aiPsychologicalResponses.anxiety.length)],
        type: 'assessment'
      };
    }

    // Depression detection
    const hasDepressionKeywords = psychologicalDatabase.depressionKeywords.some(keyword => 
      lowerInput.includes(keyword)
    );
    
    if (hasDepressionKeywords) {
      setUserContext(prev => ({ ...prev, mood: 'depressed', concerns: [...(prev.concerns || []), 'depression'] }));
      return {
        response: aiPsychologicalResponses.depression[Math.floor(Math.random() * aiPsychologicalResponses.depression.length)],
        type: 'assessment'
      };
    }

    // Academic stress detection
    const hasAcademicKeywords = psychologicalDatabase.academicKeywords.some(keyword => 
      lowerInput.includes(keyword)
    );
    
    if (hasAcademicKeywords) {
      setUserContext(prev => ({ ...prev, concerns: [...(prev.concerns || []), 'academic'] }));
      return {
        response: aiPsychologicalResponses.academic[Math.floor(Math.random() * aiPsychologicalResponses.academic.length)],
        type: 'resource'
      };
    }

    // Relationship concerns
    const hasRelationshipKeywords = psychologicalDatabase.relationshipKeywords.some(keyword => 
      lowerInput.includes(keyword)
    );
    
    if (hasRelationshipKeywords) {
      return {
        response: "Relationships can be one of the most rewarding and challenging aspects of our lives. Whether it's family expectations, friendships, romantic relationships, or social connections, these dynamics significantly impact our mental health.\n\n💝 **Relationship Wellbeing:**\n• Healthy relationships involve mutual respect and communication\n• It's okay to set boundaries, even with people you love\n• Conflict is normal - it's how we handle it that matters\n• You deserve relationships that support your growth\n\nWhat's happening in your relationships that's concerning you? Are you dealing with conflict, communication issues, or feeling disconnected from others?",
        type: 'general'
      };
    }

    // CBT technique requests
    if (lowerInput.includes('thought') || lowerInput.includes('thinking') || lowerInput.includes('negative')) {
      return {
        response: cbtTechniques.thoughtChallenging[Math.floor(Math.random() * cbtTechniques.thoughtChallenging.length)],
        type: 'assessment'
      };
    }

    if (lowerInput.includes('activity') || lowerInput.includes('motivation') || lowerInput.includes('energy')) {
      return {
        response: cbtTechniques.behavioralActivation[Math.floor(Math.random() * cbtTechniques.behavioralActivation.length)],
        type: 'resource'
      };
    }

    if (lowerInput.includes('mindful') || lowerInput.includes('present') || lowerInput.includes('breathing')) {
      return {
        response: cbtTechniques.mindfulness[Math.floor(Math.random() * cbtTechniques.mindfulness.length)],
        type: 'resource'
      };
    }

    // General supportive responses
    return {
      response: aiPsychologicalResponses.general[Math.floor(Math.random() * aiPsychologicalResponses.general.length)],
      type: 'general'
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = analyzeUserInput(currentInput);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse.response,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);

      // Add follow-up message for crisis situations
      if (aiResponse.type === 'crisis') {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: messages.length + 3,
            text: "I want to emphasize that while I'm here to provide support, I'm an AI and cannot replace professional crisis intervention. Please reach out to the emergency numbers I provided. Your safety is the most important thing right now. Can you tell me if you've contacted any of these resources?",
            sender: 'ai',
            timestamp: new Date(),
            type: 'crisis'
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 2000);
      }
    }, 1500 + Math.random() * 1000); // Variable response time for more natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "I'm feeling anxious about exams",
    "I'm struggling with depression",
    "I need help with stress management",
    "I'm having relationship problems",
    "I need crisis support",
    "I want to learn coping techniques"
  ];

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        >
          <div className="relative">
            <ChatBubbleBottomCenterTextIcon className="h-7 w-7" />
            <SparklesIcon className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-96'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                <SparklesIcon className="h-3 w-3 absolute -top-0.5 -right-0.5 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">ARIA - AI Mental Health Assistant</h3>
                <p className="text-xs text-blue-100">Psychological support • Available 24/7</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.type === 'crisis'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : message.type === 'crisis'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {message.sender === 'ai' && (
                            <span className="ml-1">• AI Assistant</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 shadow-sm border border-gray-200 px-3 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-gray-500">ARIA is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Quick topics to explore:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors duration-200"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  🚨 Emergency? Call 112 or Suicide Prevention: 9152987821
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;