'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import '../../styles/chat.css';

const PREVIEW_MESSAGES = [
  {
    role: 'user',
    content: 'Minneapolis to Nairobi, mid-April, 2 weeks, budget around $1300',
  },
  {
    role: 'ai',
    content: '**Budget check:** generated response goes here.',
  },
];

/* Build a natural-language query from URL search params */
function buildInitialQuery(params) {
  const parts = [];
  const from       = params.get('from');
  const to         = params.get('to');
  const dates      = params.get('dates');
  const passengers = params.get('passengers');
  if (from && to) parts.push(`${from} to ${to}`);
  else if (from)  parts.push(`from ${from}`);
  else if (to)    parts.push(`to ${to}`);
  if (dates)                         parts.push(dates);
  if (passengers && passengers !== '1') parts.push(`${passengers} passengers`);
  return parts.join(', ');
}

export function ChatPanel({ preview = false }) {
  const searchParams  = useSearchParams();
  const initialQuery  = preview ? '' : buildInitialQuery(searchParams);

  const [messages,  setMessages]  = useState(preview ? PREVIEW_MESSAGES : []);
  const [input,     setInput]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  /* Auto-submit if the page was opened with trip params */
  useEffect(() => {
    if (initialQuery) submit(initialQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function submit(message) {
    if (!message.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { reply } = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(input);
    setInput('');
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className={`chat-pulse${isLoading ? ' chat-pulse--loading' : ''}`} aria-hidden="true" />
        <span className="chat-title">AI Trip Advisor</span>
        <span className="chat-rule" aria-hidden="true" />
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
            <MessageContent content={msg.content} />
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble chat-bubble--ai chat-bubble--thinking" aria-label="Thinking">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!preview && (
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe your trip…"
            disabled={isLoading}
          />
          <button type="submit" className="chat-send" disabled={isLoading || !input.trim()}>
            Send →
          </button>
        </form>
      )}
    </div>
  );
}

function MessageContent({ content }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  );
}
