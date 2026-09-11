import React from 'react';
import { Language } from '../types';
import { getLocale } from '../locales';
import { RotateCcw, X } from 'lucide-react';

interface ChatHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  language,
  onLanguageChange,
  onReset,
  onClose
}) => {
  const locale = getLocale(language);

  return (
    <div
      style={{
        padding: '0.6rem 0.85rem',
        background: 'linear-gradient(135deg, rgba(7, 18, 13, 0.98) 0%, rgba(13, 36, 24, 0.96) 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        flexShrink: 0
      }}
    >
      {/* Left: Mitra Avatar & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/assets/Hello Chat Bot.gif"
              alt="Mitra"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '8px',
              height: '8px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '1.5px solid #07120D',
              boxShadow: '0 0 5px #10B981'
            }}
            title="Online"
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', lineHeight: 1.15 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: 'var(--text-ivory)'
              }}
            >
              {locale.mitraName}
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                color: 'var(--accent-gold)',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                padding: '1px 5px',
                borderRadius: '999px',
                fontWeight: 500
              }}
            >
              {locale.assistantTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Language Pills & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {/* Compact Language Selector */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '2px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {(['en', 'hi', 'mr'] as Language[]).map(code => {
            const labels = { en: 'EN', hi: 'हिंदी', mr: 'मराठी' };
            const isActive = language === code;
            return (
              <button
                key={code}
                onClick={() => onLanguageChange(code)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)' : 'transparent',
                  color: isActive ? '#07120D' : 'var(--text-cream)',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '2px 6px',
                  fontSize: '0.68rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  lineHeight: 1.2
                }}
              >
                {labels[code]}
              </button>
            );
          })}
        </div>

        {/* Restart Conversation */}
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px'
          }}
          title={locale.resetChatTooltip}
          aria-label={locale.resetChatTooltip}
        >
          <RotateCcw size={13} />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-cream)',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px'
          }}
          title={locale.closeTooltip}
          aria-label={locale.closeTooltip}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
