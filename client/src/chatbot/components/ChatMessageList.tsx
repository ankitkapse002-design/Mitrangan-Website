import React, { useEffect, useRef } from 'react';
import { Message, QuickReply } from '../types';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatQuickReplies } from './ChatQuickReplies';

interface ChatMessageListProps {
  messages: Message[];
  isTyping?: boolean;
  activeQuickReplies?: QuickReply[];
  onSelectQuickReply: (reply: QuickReply) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping = false,
  activeQuickReplies = [],
  onSelectQuickReply
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeQuickReplies]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0.9rem 0.9rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(212, 175, 55, 0.3) transparent'
      }}
    >
      {messages.map(msg => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0.4rem 0'
          }}
          role="status"
          aria-label="Mitra is typing..."
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <img src="/assets/Hello Chat Bot.gif" alt="Mitra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div
            style={{
              padding: '0.6rem 0.9rem',
              borderRadius: '4px 16px 16px 16px',
              background: 'rgba(10, 24, 18, 0.9)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                animation: 'bounce 1.4s infinite ease-in-out'
              }}
            />
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                animation: 'bounce 1.4s infinite ease-in-out 0.2s'
              }}
            />
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                animation: 'bounce 1.4s infinite ease-in-out 0.4s'
              }}
            />
          </div>
        </div>
      )}

      {/* Active Quick Replies placed naturally at current conversational point */}
      {activeQuickReplies.length > 0 && !isTyping && (
        <div style={{ marginTop: '0.35rem' }}>
          <ChatQuickReplies replies={activeQuickReplies} onSelect={onSelectQuickReply} />
        </div>
      )}

      <div ref={bottomRef} style={{ height: '4px' }} />
    </div>
  );
};
