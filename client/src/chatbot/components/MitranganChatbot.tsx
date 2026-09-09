import React, { useState, useEffect, useRef } from 'react';
import { ConversationState, Language, Message, QuickReply } from '../types';
import { getLocale } from '../locales';
import { getInitialConversationState, processUserMessage } from '../engine/conversationEngine';
import { getInitialBrowserLanguage } from '../engine/detector';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { X, Sparkles } from 'lucide-react';

export const MitranganChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isGreetingExiting, setIsGreetingExiting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize language from browser preference
  const [currentLang, setCurrentLang] = useState<Language>(() => getInitialBrowserLanguage());
  const [conversationState, setConversationState] = useState<ConversationState>(() =>
    getInitialConversationState(getInitialBrowserLanguage())
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [activeQuickReplies, setActiveQuickReplies] = useState<QuickReply[]>([]);

  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownGreetingRef = useRef(false);

  // Initialize opening welcome message
  useEffect(() => {
    const locale = getLocale(currentLang);
    const welcomeMsg: Message = {
      id: 'msg-welcome-0',
      sender: 'bot',
      text: locale.welcomeMessage,
      timestamp: Date.now(),
      language: currentLang
    };
    setMessages([welcomeMsg]);
    setActiveQuickReplies(locale.initialQuickReplies);
  }, []);

  // Attention-Grabbing Greeting Lifecycle:
  // Page load -> wait 2.5s -> show greeting bubble -> stay visible 6.5s -> gently fade out -> button remains
  useEffect(() => {
    if (isOpen || hasShownGreetingRef.current) return;

    greetingTimerRef.current = setTimeout(() => {
      if (!isOpen && !hasShownGreetingRef.current) {
        setShowGreeting(true);
        hasShownGreetingRef.current = true;

        // Auto-dismiss after 6.5 seconds
        hideTimerRef.current = setTimeout(() => {
          dismissGreeting();
        }, 6500);
      }
    }, 2500);

    return () => {
      if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isOpen]);

  const dismissGreeting = () => {
    setIsGreetingExiting(true);
    setTimeout(() => {
      setShowGreeting(false);
      setIsGreetingExiting(false);
    }, 350);
  };

  // Handle mid-conversation language change
  const handleLanguageChange = async (newLang: Language) => {
    if (newLang === currentLang) return;

    setCurrentLang(newLang);
    const newLocale = getLocale(newLang);

    const updatedState: ConversationState = {
      ...conversationState,
      language: newLang
    };
    setConversationState(updatedState);

    const langNotice: Message = {
      id: `msg-lang-${Date.now()}`,
      sender: 'bot',
      text: newLocale.langChangedNotice,
      timestamp: Date.now(),
      language: newLang
    };

    setMessages(prev => [...prev, langNotice]);

    if (updatedState.scenario === 'self' || updatedState.scenario === 'family') {
      setActiveQuickReplies(newLocale.concernOptions);
    } else if (updatedState.scenario === 'admission') {
      setActiveQuickReplies(newLocale.admissionQuickReplies);
    } else if (updatedState.registrationStep !== 'idle' && updatedState.registrationStep !== 'completed') {
      if (updatedState.registrationStep === 'asking_pickup') {
        setActiveQuickReplies(newLocale.pickupOptions);
      } else {
        setActiveQuickReplies([]);
      }
    } else {
      setActiveQuickReplies(newLocale.initialQuickReplies);
    }
  };

  // Reset conversation
  const handleReset = () => {
    const locale = getLocale(currentLang);
    const freshState = getInitialConversationState(currentLang);
    setConversationState(freshState);

    const welcomeMsg: Message = {
      id: `msg-reset-${Date.now()}`,
      sender: 'bot',
      text: locale.welcomeMessage,
      timestamp: Date.now(),
      language: currentLang
    };

    setMessages([welcomeMsg]);
    setActiveQuickReplies(locale.initialQuickReplies);
  };

  // Process user message
  const handleSendMessage = async (text: string, quickReplyPayload?: string) => {
    const userText = text;
    const actionInput = quickReplyPayload || text;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: Date.now(),
      language: currentLang
    };

    setMessages(prev => [...prev, userMsg]);
    setActiveQuickReplies([]);
    setIsTyping(true);

    await new Promise(res => setTimeout(res, 380));

    try {
      const result = await processUserMessage(actionInput, conversationState);

      if (result.nextState.language !== currentLang) {
        setCurrentLang(result.nextState.language);
      }

      setConversationState(result.nextState);

      const botMsg: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: result.replyText,
        timestamp: Date.now(),
        language: result.nextState.language,
        cardType: result.cardType,
        cardData: result.cardData
      };

      setMessages(prev => [...prev, botMsg]);
      setActiveQuickReplies(result.quickReplies || []);
    } catch {
      const locale = getLocale(currentLang);
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        sender: 'bot',
        text: locale.registrationError('System temporary error. Please call our 24/7 helpline.'),
        timestamp: Date.now(),
        language: currentLang
      };
      setMessages(prev => [...prev, errorMsg]);
      setActiveQuickReplies(locale.initialQuickReplies);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.label, reply.payload);
  };

  const handleTalkToTeam = () => {
    const locale = getLocale(currentLang);
    handleSendMessage(locale.talkToTeamButton, 'talk_to_team');
  };

  // Language-specific greeting text for the floating bubble
  const getGreetingText = () => {
    switch (currentLang) {
      case 'hi':
        return {
          title: 'नमस्ते, मैं कार्तिक हूँ 👋',
          subtitle: 'मैं आज आपकी किस तरह मदद कर सकता हूँ?'
        };
      case 'mr':
        return {
          title: 'नमस्कार, मी कार्तिक आहे 👋',
          subtitle: 'मी आज तुम्हाला कशी मदत करू शकतो?'
        };
      case 'en':
      default:
        return {
          title: "Hi, I'm Kartik 👋",
          subtitle: 'How can I assist you today?'
        };
    }
  };

  const greeting = getGreetingText();

  return (
    <>
      {/* Dynamic Keyframes & Responsive Layout for Kartik Chatbot */}
      <style>{`
        @keyframes kartikFloat {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.65), 0 0 16px rgba(212, 175, 55, 0.3);
          }
          50% {
            transform: translateY(-4px);
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.75), 0 0 24px rgba(212, 175, 55, 0.48);
          }
        }

        @keyframes greetingSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes greetingSlideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
          }
        }

        @keyframes chatPanelOpen {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .kartik-launcher-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 95;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: auto;
        }

        .kartik-launcher-btn {
          width: 52px;
          height: 52px;
        }

        .kartik-panel {
          position: fixed;
          bottom: 86px;
          right: 24px;
          width: 380px;
          height: min(525px, calc(100vh - 120px));
          max-width: calc(100vw - 32px);
          z-index: 96;
          background: rgba(7, 18, 13, 0.97);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.88), 0 0 32px rgba(212, 175, 55, 0.14);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: chatPanelOpen 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .kartik-greeting-bubble {
          bottom: 64px;
          right: 0px;
        }

        @media (max-width: 1023px) and (min-width: 641px) {
          .kartik-launcher-container {
            bottom: 20px;
            right: 20px;
          }
          .kartik-launcher-btn {
            width: 50px;
            height: 50px;
          }
          .kartik-panel {
            bottom: 80px;
            right: 20px;
            width: min(370px, calc(100vw - 36px));
            height: min(495px, calc(100vh - 110px));
            max-width: calc(100vw - 36px);
          }
          .kartik-greeting-bubble {
            bottom: 60px;
          }
        }

        @media (max-width: 640px) {
          .kartik-launcher-container {
            bottom: 16px;
            right: 14px;
          }
          .kartik-launcher-btn {
            width: 48px;
            height: 48px;
          }
          .kartik-panel {
            bottom: 74px;
            right: 12px;
            left: 12px;
            width: auto;
            max-width: 380px;
            margin-left: auto;
            height: min(470px, calc(100dvh - 90px), calc(100vh - 90px));
            border-radius: 16px;
          }
          .kartik-greeting-bubble {
            bottom: 56px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kartik-launcher-btn, .kartik-greeting-bubble, .kartik-panel {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* 1. Floating Launcher Container */}
      <div className="kartik-launcher-container">
        {/* Language-Aware Greeting Bubble (Appears briefly after page load, then fades) */}
        {!isOpen && showGreeting && (
          <div
            className="kartik-greeting-bubble"
            onClick={() => {
              setIsOpen(true);
              dismissGreeting();
            }}
            style={{
              position: 'absolute',
              background: 'linear-gradient(135deg, rgba(7, 18, 13, 0.98) 0%, rgba(13, 36, 24, 0.96) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '14px',
              padding: '0.65rem 0.9rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.75), 0 0 18px rgba(212, 175, 55, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              cursor: 'pointer',
              width: 'max-content',
              maxWidth: '250px',
              animation: isGreetingExiting
                ? 'greetingSlideOut 0.35s ease forwards'
                : 'greetingSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              userSelect: 'none'
            }}
            role="status"
            aria-live="polite"
          >
            {/* Header with Title & Dismiss Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={13} color="var(--accent-gold)" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-ivory)'
                  }}
                >
                  {greeting.title}
                </span>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  dismissGreeting();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1
                }}
                aria-label="Dismiss greeting"
              >
                <X size={12} />
              </button>
            </div>

            {/* Subtitle / Question */}
            <span
              style={{
                fontSize: '0.74rem',
                color: 'var(--accent-sage)',
                lineHeight: 1.35,
                marginTop: '1px'
              }}
            >
              {greeting.subtitle}
            </span>
          </div>
        )}

        {/* Circular Assistant Launcher Button */}
        <button
          className="kartik-launcher-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            if (showGreeting) dismissGreeting();
          }}
          style={{
            borderRadius: '50%',
            background: isOpen
              ? 'rgba(7, 18, 13, 0.96)'
              : 'linear-gradient(135deg, #1A4D36 0%, #07120D 100%)',
            border: '1.5px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: !isOpen ? 'kartikFloat 4.5s ease-in-out infinite' : 'none',
            outline: 'none'
          }}
          aria-expanded={isOpen}
          aria-label="Open Mitrangan Assistant"
          title="Kartik — Mitrangan Assistant"
        >
          {isOpen ? (
            <X size={20} color="var(--accent-gold)" />
          ) : (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/assets/shield_icon.png"
                alt="Kartik"
                style={{ width: '25px', height: '25px', objectFit: 'contain' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#10B981',
                  borderRadius: '50%',
                  border: '1.5px solid #07120D',
                  boxShadow: '0 0 6px #10B981'
                }}
              />
            </div>
          )}
        </button>
      </div>

      {/* 2. Elevated Floating Chat Panel (Strictly Anchored to Bottom-Right) */}
      {isOpen && (
        <div
          className="kartik-panel"
          role="dialog"
          aria-label="Mitrangan Virtual Assistant Chat"
        >
          <ChatHeader
            language={currentLang}
            onLanguageChange={handleLanguageChange}
            onReset={handleReset}
            onClose={() => setIsOpen(false)}
          />

          <ChatMessageList
            messages={messages}
            isTyping={isTyping}
            activeQuickReplies={activeQuickReplies}
            onSelectQuickReply={handleSelectQuickReply}
          />

          <ChatInput
            language={currentLang}
            onSendMessage={text => handleSendMessage(text)}
            onTalkToTeam={handleTalkToTeam}
            disabled={isTyping}
          />
        </div>
      )}
    </>
  );
};


