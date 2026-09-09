import React from 'react';
import { QuickReply } from '../types';

interface ChatQuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  disabled?: boolean;
}

export const ChatQuickReplies: React.FC<ChatQuickRepliesProps> = ({
  replies,
  onSelect,
  disabled = false
}) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.3rem',
        padding: '0.3rem 0.1rem',
        animation: 'fadeIn 0.2s ease-in-out'
      }}
    >
      {replies.map((r, idx) => (
        <button
          key={`${r.id}-${idx}`}
          onClick={() => onSelect(r)}
          disabled={disabled}
          style={{
            background: 'rgba(13, 36, 24, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.32)',
            color: 'var(--text-ivory)',
            padding: '0.28rem 0.62rem',
            borderRadius: '999px',
            fontSize: '0.76rem',
            lineHeight: 1.3,
            fontFamily: 'inherit',
            fontWeight: 500,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '100%',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            opacity: disabled ? 0.6 : 1
          }}
          onMouseEnter={e => {
            if (!disabled) {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.22)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={e => {
            if (!disabled) {
              e.currentTarget.style.background = 'rgba(13, 36, 24, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.32)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};
