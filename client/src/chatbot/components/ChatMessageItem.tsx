import React, { useState } from 'react';
import { Message } from '../types';
import { Phone, MessageCircle, Check, Copy, AlertTriangle } from 'lucide-react';

interface ChatMessageItemProps {
  message: Message;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe Markdown parser for basic formatting
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (!line) return <div key={idx} style={{ height: '0.25rem' }} />;

      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h4
            key={idx}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--accent-gold)',
              margin: '0.25rem 0 0.15rem',
              lineHeight: 1.25
            }}
          >
            {line.replace('### ', '')}
          </h4>
        );
      }

      // Bullet points
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const bulletContent = line.replace(/^[•-]\s+/, '');
        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.35rem',
              margin: '0.12rem 0',
              lineHeight: 1.35
            }}
          >
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.82rem' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(bulletContent) }} />
          </div>
        );
      }

      return (
        <p
          key={idx}
          style={{
            margin: '0.15rem 0',
            lineHeight: 1.4,
            fontSize: '0.83rem'
          }}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    });
  };

  const formatInline = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background: rgba(212,175,55,0.15); padding: 1px 3px; border-radius: 3px; font-family: monospace; font-size: 0.85em; color: var(--accent-gold);">$1</code>');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isBot ? 'flex-start' : 'flex-end',
        margin: '0.25rem 0'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          maxWidth: isBot ? '94%' : '88%',
          alignItems: 'flex-start'
        }}
      >
        {isBot && (
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '3px'
              }}
            >
              <img src="/assets/Hello Chat Bot.gif" alt="Aasha" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        )}

        <div
          style={{
            padding: '0.55rem 0.78rem',
            borderRadius: isBot ? '3px 14px 14px 14px' : '14px 14px 3px 14px',
            background: isBot
              ? 'rgba(10, 24, 18, 0.95)'
              : 'linear-gradient(135deg, rgba(30, 77, 54, 0.95) 0%, rgba(16, 45, 32, 0.95) 100%)',
            border: isBot ? '1px solid rgba(212, 175, 55, 0.18)' : '1px solid rgba(16, 185, 129, 0.25)',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)',
            color: 'var(--text-cream)',
            fontSize: '0.83rem',
            wordBreak: 'break-word'
          }}
        >
          {renderFormattedText(message.text)}

          {/* Action Card: Contact & Human Handoff */}
          {message.cardType === 'contact' && message.cardData && (
            <div
              style={{
                marginTop: '0.5rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <a
                href={message.cardData.whatsAppUrl || 'https://wa.me/919767362388'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.65rem', width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={13} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${message.cardData.phoneNagpur || '+919767362388'}`}
                className="btn btn-emerald"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.65rem', width: '100%', justifyContent: 'center' }}
              >
                <Phone size={13} />
                <span>Call Helpline: {message.cardData.phoneNagpur || '+91 9767362388'}</span>
              </a>
            </div>
          )}

          {/* Action Card: Emergency Alert */}
          {message.cardType === 'emergency' && message.cardData && (
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: 'rgba(220, 38, 38, 0.12)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F87171', fontSize: '0.78rem', fontWeight: 600 }}>
                <AlertTriangle size={13} />
                <span>24/7 Immediate Emergency Help</span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <a
                  href={`tel:${message.cardData.phoneNagpur || '+919767362388'}`}
                  className="btn btn-emerald"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem', width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={12} />
                  <span>Call 24/7 Helpline: +91 9767362388</span>
                </a>
              </div>
            </div>
          )}

          {/* Action Card: Registration Success */}
          {message.cardType === 'registration_success' && message.cardData && (
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.55rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-sage)' }}>User ID:</span>
                <button
                  onClick={() => handleCopy(message.cardData?.userId || '')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-gold)',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  {copied ? <Check size={11} color="#10B981" /> : <Copy size={11} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--accent-gold)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '4px 8px',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}
              >
                {message.cardData.userId}
              </div>
            </div>
          )}

          {/* Action Card: Status Result */}
          {message.cardType === 'status' && message.cardData && (
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.55rem',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.3rem',
                fontSize: '0.74rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>User ID:</span>
                <span style={{ color: 'var(--accent-gold)', fontFamily: 'monospace', fontWeight: 600 }}>
                  {message.cardData.userId}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block' }}>Status:</span>
                <span
                  style={{
                    color:
                      message.cardData.admissionStatus === 'Approved'
                        ? '#10B981'
                        : message.cardData.admissionStatus === 'Not Approved'
                        ? '#EF4444'
                        : 'var(--accent-gold)',
                    fontWeight: 600
                  }}
                >
                  {message.cardData.admissionStatus}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
