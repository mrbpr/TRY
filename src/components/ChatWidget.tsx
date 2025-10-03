import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChatBubbleBottomCenterTextIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  MinusIcon,
  SparklesIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  Bars3BottomRightIcon,
  MagnifyingGlassIcon
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

interface ChatSize {
  width: number;
  height: number;
}

type ChatState = 'minimized' | 'normal' | 'maximized' | 'closed';

interface SnapZone {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'corner' | 'edge' | 'center';
  magneticStrength: number;
}

interface FluidPosition {
  x: number;
  y: number;
  isSnapped: boolean;
  snapZone?: SnapZone;
}

const ChatWidget: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>('closed');
  const [chatSize, setChatSize] = useState<ChatSize>({ width: 450, height: 600 });
  const [position, setPosition] = useState<FluidPosition>({ 
    x: 24, 
    y: 24, 
    isSnapped: false 
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSnapZones, setShowSnapZones] = useState(false);
  const [snapZones, setSnapZones] = useState<SnapZone[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragPreview, setDragPreview] = useState<{ x: number; y: number } | null>(null);
  
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
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Snap zone configuration
  const SNAP_THRESHOLD = 30;
  const MAGNETIC_STRENGTH = 15;
  const ANIMATION_DURATION = 300;

  // Generate snap zones based on viewport
  const generateSnapZones = useCallback((): SnapZone[] => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const zones: SnapZone[] = [
      // Corner zones
      { x: 20, y: 20, width: 100, height: 100, type: 'corner', magneticStrength: MAGNETIC_STRENGTH },
      { x: viewport.width - 120, y: 20, width: 100, height: 100, type: 'corner', magneticStrength: MAGNETIC_STRENGTH },
      { x: 20, y: viewport.height - 120, width: 100, height: 100, type: 'corner', magneticStrength: MAGNETIC_STRENGTH },
      { x: viewport.width - 120, y: viewport.height - 120, width: 100, height: 100, type: 'corner', magneticStrength: MAGNETIC_STRENGTH },
      
      // Edge zones (center of each edge)
      { x: viewport.width / 2 - 50, y: 20, width: 100, height: 50, type: 'edge', magneticStrength: MAGNETIC_STRENGTH },
      { x: viewport.width / 2 - 50, y: viewport.height - 70, width: 100, height: 50, type: 'edge', magneticStrength: MAGNETIC_STRENGTH },
      { x: 20, y: viewport.height / 2 - 50, width: 50, height: 100, type: 'edge', magneticStrength: MAGNETIC_STRENGTH },
      { x: viewport.width - 70, y: viewport.height / 2 - 50, width: 50, height: 100, type: 'edge', magneticStrength: MAGNETIC_STRENGTH },
      
      // Center zone
      { x: viewport.width / 2 - 75, y: viewport.height / 2 - 75, width: 150, height: 150, type: 'center', magneticStrength: MAGNETIC_STRENGTH * 0.7 }
    ];

    return zones;
  }, []);

  // Calculate distance between two points
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Find nearest snap zone
  const findNearestSnapZone = useCallback((x: number, y: number): SnapZone | null => {
    let nearestZone: SnapZone | null = null;
    let minDistance = SNAP_THRESHOLD;

    for (const zone of snapZones) {
      const zoneCenterX = zone.x + zone.width / 2;
      const zoneCenterY = zone.y + zone.height / 2;
      const distance = calculateDistance(x, y, zoneCenterX, zoneCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        nearestZone = zone;
      }
    }

    return nearestZone;
  }, [snapZones]);

  // Animate position change
  const animateToPosition = useCallback((targetX: number, targetY: number, duration: number = ANIMATION_DURATION) => {
    const startX = position.x;
    const startY = position.y;
    const startTime = performance.now();
    
    setIsAnimating(true);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startX + (targetX - startX) * easeOut;
      const currentY = startY + (targetY - startY) * easeOut;
      
      setPosition(prev => ({
        ...prev,
        x: currentX,
        y: currentY
      }));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [position.x, position.y]);

  // Intelligent collision detection
  const checkCollisions = useCallback((x: number, y: number): { x: number; y: number } => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Ensure widget stays within viewport bounds
    const constrainedX = Math.max(0, Math.min(viewport.width - chatSize.width, x));
    const constrainedY = Math.max(0, Math.min(viewport.height - chatSize.height, y));

    // Add buffer zones near edges for better UX
    const buffer = 10;
    const finalX = constrainedX < buffer ? buffer : 
                   constrainedX > viewport.width - chatSize.width - buffer ? 
                   viewport.width - chatSize.width - buffer : constrainedX;
    
    const finalY = constrainedY < buffer ? buffer : 
                   constrainedY > viewport.height - chatSize.height - buffer ? 
                   viewport.height - chatSize.height - buffer : constrainedY;

    return { x: finalX, y: finalY };
  }, [chatSize]);

  // Handle viewport resize
  const handleViewportResize = useCallback(() => {
    setSnapZones(generateSnapZones());
    
    // Reposition widget if it's outside new viewport
    const newPosition = checkCollisions(position.x, position.y);
    if (newPosition.x !== position.x || newPosition.y !== position.y) {
      animateToPosition(newPosition.x, newPosition.y, 200);
    }
  }, [generateSnapZones, checkCollisions, position.x, position.y, animateToPosition]);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('chatWidget-preferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        if (prefs.size) setChatSize(prefs.size);
        if (prefs.position) setPosition(prefs.position);
      } catch (error) {
        console.warn('Failed to parse chat preferences:', error);
      }
    }
    
    // Initialize snap zones
    setSnapZones(generateSnapZones());
    
    // Add viewport resize listener
    window.addEventListener('resize', handleViewportResize);
    
    return () => {
      window.removeEventListener('resize', handleViewportResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [generateSnapZones, handleViewportResize]);

  // Save user preferences to localStorage
  const savePreferences = useCallback(() => {
    try {
      const preferences = {
        size: chatSize,
        position: position,
        state: chatState
      };
      localStorage.setItem('chatWidget-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('Failed to save chat preferences:', error);
    }
  }, [chatSize, position, chatState]);

  useEffect(() => {
    savePreferences();
  }, [savePreferences]);

  // Psychological knowledge base and response patterns (keeping existing logic)
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
    if (chatState === 'normal' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatState]);

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
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Resize functionality
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeHandle(handle);
    
    const rect = chatRef.current?.getBoundingClientRect();
    if (rect) {
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height
      };
    }
  };

  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeHandle) return;

    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    
    let newWidth = resizeStartRef.current.width;
    let newHeight = resizeStartRef.current.height;

    // Handle different resize directions
    if (resizeHandle.includes('right')) {
      newWidth = Math.max(300, resizeStartRef.current.width + deltaX);
    }
    if (resizeHandle.includes('left')) {
      newWidth = Math.max(300, resizeStartRef.current.width - deltaX);
    }
    if (resizeHandle.includes('bottom')) {
      newHeight = Math.max(400, resizeStartRef.current.height + deltaY);
    }
    if (resizeHandle.includes('top')) {
      newHeight = Math.max(400, resizeStartRef.current.height - deltaY);
    }

    // Constrain to viewport
    const maxWidth = window.innerWidth - position.x - 20;
    const maxHeight = window.innerHeight - position.y - 20;
    
    newWidth = Math.min(newWidth, maxWidth);
    newHeight = Math.min(newHeight, maxHeight);

    setChatSize({ width: newWidth, height: newHeight });
  }, [isResizing, resizeHandle, position]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeHandle('');
  }, []);

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent) => {
    if (chatState === 'maximized') return;
    
    setShowSnapZones(true);
    setIsDragging(true);
    const rect = chatRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      lastPositionRef.current = { x: position.x, y: position.y };
    }
  };

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || chatState === 'maximized') return;

    const rawX = e.clientX - dragOffset.x;
    const rawY = e.clientY - dragOffset.y;
    
    // Check for snap zones
    const nearestZone = findNearestSnapZone(rawX + chatSize.width / 2, rawY + chatSize.height / 2);
    
    let finalX = rawX;
    let finalY = rawY;
    let isSnapped = false;
    
    if (nearestZone) {
      // Apply magnetic effect
      const zoneCenterX = nearestZone.x + nearestZone.width / 2;
      const zoneCenterY = nearestZone.y + nearestZone.height / 2;
      
      finalX = zoneCenterX - chatSize.width / 2;
      finalY = zoneCenterY - chatSize.height / 2;
      isSnapped = true;
    }
    
    // Apply collision detection
    const constrainedPosition = checkCollisions(finalX, finalY);
    
    // Update drag preview
    setDragPreview({ x: constrainedPosition.x, y: constrainedPosition.y });
    
    setPosition(prev => ({
      x: constrainedPosition.x,
      y: constrainedPosition.y,
      isSnapped,
      snapZone: nearestZone || undefined
    }));
  }, [isDragging, chatSize, dragOffset, chatState, isAnimating, findNearestSnapZone, checkCollisions]);

  const handleDragEnd = useCallback(() => {
    setShowSnapZones(false);
    setDragPreview(null);
    setIsDragging(false);
    
    // If snapped, animate to perfect position
    if (position.isSnapped && position.snapZone) {
      const perfectX = position.snapZone.x + position.snapZone.width / 2 - chatSize.width / 2;
      const perfectY = position.snapZone.y + position.snapZone.height / 2 - chatSize.height / 2;
      const constrainedPosition = checkCollisions(perfectX, perfectY);
      
      if (Math.abs(constrainedPosition.x - position.x) > 2 || Math.abs(constrainedPosition.y - position.y) > 2) {
        animateToPosition(constrainedPosition.x, constrainedPosition.y, 150);
      }
    }
  }, [position.isSnapped, position.snapZone, chatSize, checkCollisions, animateToPosition]);

  // Mouse event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
    }
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isResizing, isDragging, handleResize, handleResizeEnd, handleDrag, handleDragEnd]);

  // State management functions
  const openChat = () => setChatState('normal');
  const minimizeChat = () => setChatState('minimized');
  const maximizeChat = () => {
    setChatState('maximized');
    setPosition(prev => ({ ...prev, isSnapped: false }));
  };
  const closeChat = () => setChatState('closed');

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

  // Get chat dimensions and position based on state
  const getChatStyle = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    switch (chatState) {
      case 'maximized':
        return {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'minimized':
        return {
          position: 'fixed' as const,
          bottom: viewportHeight - position.y - 60,
          left: position.x,
          width: 300,
          height: 60,
          zIndex: 50,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'normal':
        return {
          position: 'fixed' as const,
          top: position.y,
          left: position.x,
          width: chatSize.width,
          height: chatSize.height,
          zIndex: 50,
          transition: isAnimating ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          transform: position.isSnapped ? 'scale(1.02)' : 'scale(1)',
          boxShadow: position.isSnapped 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(59, 130, 246, 0.3)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        };
      default:
        return { display: 'none' };
    }
  };

  if (chatState === 'closed') {
    return (
      <button
        onClick={openChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        aria-label="Open chat assistant"
      >
        <div className="relative">
          <ChatBubbleBottomCenterTextIcon className="h-7 w-7" />
          <SparklesIcon className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Snap Zones Overlay */}
      {showSnapZones && chatState === 'normal' && (
        <div className="fixed inset-0 pointer-events-none z-45">
          {snapZones.map((zone, index) => (
            <div
              key={index}
              className={`absolute border-2 border-dashed rounded-lg transition-all duration-200 ${
                zone.type === 'corner' 
                  ? 'border-blue-400 bg-blue-50 bg-opacity-20' 
                  : zone.type === 'edge'
                  ? 'border-green-400 bg-green-50 bg-opacity-20'
                  : 'border-purple-400 bg-purple-50 bg-opacity-20'
              }`}
              style={{
                left: zone.x,
                top: zone.y,
                width: zone.width,
                height: zone.height,
                opacity: 0.6
              }}
            >
              <div className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${
                zone.type === 'corner' ? 'text-blue-600' : 
                zone.type === 'edge' ? 'text-green-600' : 'text-purple-600'
              }`}>
                {zone.type}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drag Preview */}
      {dragPreview && isDragging && (
        <div
          className="fixed pointer-events-none z-46 opacity-50"
          style={{
            left: dragPreview.x,
            top: dragPreview.y,
            width: chatSize.width,
            height: chatSize.height
          }}
        >
          <div className="w-full h-full bg-blue-200 border-2 border-blue-400 border-dashed rounded-2xl"></div>
        </div>
      )}

    <div
      ref={chatRef}
      style={getChatStyle()}
      className={`bg-white rounded-2xl border border-gray-200 flex flex-col ${
        chatState === 'maximized' ? 'rounded-none' : ''
      } ${isResizing || isDragging ? 'select-none' : ''} ${
        position.isSnapped ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 flex items-center justify-between ${
          chatState === 'normal' && !isAnimating ? 'cursor-move' : 'cursor-default'
        } ${
          chatState === 'maximized' ? 'rounded-none' : 'rounded-t-2xl'
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleDragStart}
        role="banner"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            <SparklesIcon className="h-3 w-3 absolute -top-0.5 -right-0.5 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">ARIA - AI Mental Health Assistant</h3>
            <p className="text-xs text-blue-100">
              {chatState === 'maximized' 
                ? 'Full Screen Mode' 
                : position.isSnapped 
                ? `Snapped to ${position.snapZone?.type} • Available 24/7`
                : 'Psychological support • Available 24/7'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {chatState === 'normal' && (
            <button
              onClick={maximizeChat}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              aria-label="Maximize chat"
            >
              <ArrowsPointingOutIcon className="h-4 w-4" />
            </button>
          )}
          
          {chatState === 'maximized' && (
            <button
              onClick={() => setChatState('normal')}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              aria-label="Restore chat size"
            >
              <ArrowsPointingInIcon className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={minimizeChat}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
            aria-label="Minimize chat"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={closeChat}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
            aria-label="Close chat"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat Content - Hidden when minimized */}
      {chatState !== 'minimized' && (
        <>
          {/* Messages */}
          <div 
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
            style={{ 
              height: chatState === 'maximized' ? 'calc(100vh - 140px)' : `${chatSize.height - 140}px` 
            }}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
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
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Send message"
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

      {/* Minimized State Content */}
      {chatState === 'minimized' && (
        <div 
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => setChatState('normal')}
          role="button"
          tabIndex={0}
          aria-label="Expand chat"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setChatState('normal');
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <ChatBubbleBottomCenterTextIcon className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">ARIA Assistant</span>
          </div>
          {messages.length > 1 && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </div>
      )}

      {/* Resize Handles - Only show in normal state */}
      {chatState === 'normal' && (
        <>
          {/* Bottom-right corner handle (primary) */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize opacity-60 hover:opacity-100 transition-opacity bg-blue-500 rounded-tl-lg"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          >
            <Bars3BottomRightIcon className="h-3 w-3 text-white m-0.5" />
          </div>
          
          {/* Other corner handles */}
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-ne-resize opacity-0 hover:opacity-60 transition-opacity bg-blue-400 rounded-tr-sm"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-se-resize opacity-0 hover:opacity-60 transition-opacity bg-blue-400 rounded-br-sm"
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-sw-resize opacity-0 hover:opacity-60 transition-opacity bg-blue-400 rounded-bl-sm"
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          />

          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-2 cursor-n-resize opacity-0 hover:opacity-40 transition-opacity hover:bg-blue-300 rounded-b"
            onMouseDown={(e) => handleResizeStart(e, 'top')}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-2 cursor-s-resize opacity-0 hover:opacity-40 transition-opacity hover:bg-blue-300 rounded-t"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-2 cursor-w-resize opacity-0 hover:opacity-40 transition-opacity hover:bg-blue-300 rounded-r"
            onMouseDown={(e) => handleResizeStart(e, 'left')}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-2 cursor-e-resize opacity-0 hover:opacity-40 transition-opacity hover:bg-blue-300 rounded-l"
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
        </>
      )}
    </div>
    </>
  );
};

export default ChatWidget;