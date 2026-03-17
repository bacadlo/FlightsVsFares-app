import '../../styles/chat.css';

const PREVIEW_MESSAGES = [
  {
    role: 'user',
    content: 'Minneapolis to Nairobi, mid-April, 2 weeks, budget around $1300',
  },
  {
    role: 'ai',
    content:
      '**Budget check:** generated response goes here.',
  },
];

export function ChatPanel({ messages = PREVIEW_MESSAGES }) {
  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-pulse" aria-hidden="true" />
        <span className="chat-title">AI Trip Advisor</span>
        <span className="chat-rule" aria-hidden="true" />
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
            <MessageContent content={msg.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageContent({ content }) {
  /* Render **bold** markdown inline without a dependency */
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
