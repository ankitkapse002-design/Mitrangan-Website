import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { getLocale } from '../locales';
import { Send, PhoneCall } from 'lucide-react';

interface ChatInputProps {
  language: Language;
  onSendMessage: (text: string) => void;
  onTalkToTeam: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  language,
  onSendMessage,
  onTalkToTeam,
  disabled = false
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const locale = getLocale(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div
      style={{
        padding: '0.45rem 0.75rem',
        background: 'rgba(7, 18, 13, 0.98)',
        borderTop: '1px solid rgba(212, 175, 55, 0.18)',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
        flexShrink: 0
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={locale.inputPlaceholder}
          disabled={disabled}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
            borderRadius: '999px',
            padding: '0.45rem 0.85rem',
            color: 'var(--text-ivory)',
            fontSize: '0.82rem',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
            e.currentTarget.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.2)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.22)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: text.trim() && !disabled
              ? 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)'
              : 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            color: text.trim() && !disabled ? '#07120D' : 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: text.trim() && !disabled ? 'pointer' : 'default',
            transition: 'all 0.15s ease',
            flexShrink: 0
          }}
          title={locale.sendButton}
          aria-label={locale.sendButton}
        >
          <Send size={14} />
        </button>
      </form>

      {/* Human Support Direct Access Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onTalkToTeam}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-gold)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '1px 4px',
            opacity: 0.88,
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.88')}
        >
          <PhoneCall size={11} />
          <span>{locale.talkToTeamButton}</span>
        </button>
      </div>
    </div>
  );
};
