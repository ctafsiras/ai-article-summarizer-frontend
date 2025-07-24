import React, { useState, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { askArticleAI } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'system';
  content: string;
}

const DEFAULT_SYSTEM_MESSAGE = 'What do you want to know about this article?';

export const ChatBox: React.FC<{ articleId: string }> = ({ articleId }) => {
  // Show/hide chat box state
  const [visible, setVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: DEFAULT_SYSTEM_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const viewport = document.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLDivElement | null;
    if (viewport) {
      scrollViewportRef.current = viewport;
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await askArticleAI(articleId, [...messages, userMsg]);
      setMessages((msgs) => [...msgs, { role: 'system', content: res }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { role: 'system', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  React.useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <>
      {visible ? (
        <div
          className="fixed bottom-6 right-6 w-80 z-50 bg-white"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.15)', borderRadius: 12 }}
        >
          {/* Header with title and minus button */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-primary text-primary-foreground rounded-t-[12px]">
            <span className="font-bold text-lg">Article AI</span>
            <button
              aria-label="Hide chat box"
              className="ml-2 text-xl font-bold bg-transparent border-none outline-none hover:opacity-70 transition-opacity"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                lineHeight: 1,
              }}
              onClick={() => setVisible(false)}
              type="button"
            >
              &minus;
            </button>
          </div>
          <Card className="rounded-t-none">
            <CardContent className="p-0">
              <ScrollArea className="h-72 p-4" ref={scrollViewportRef}>
                <div className="flex flex-col gap-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={
                        msg.role === 'user'
                          ? 'self-end bg-primary text-primary-foreground px-3 py-2 rounded-xl max-w-[80%]'
                          : 'self-start bg-muted text-muted-foreground px-3 py-2 rounded-xl max-w-[80%]'
                      }
                    >
                      {msg.content}
                    </div>
                  ))}
                  {loading && (
                    <div className="self-start flex items-center gap-2 bg-muted text-muted-foreground px-3 py-2 rounded-xl max-w-[80%] animate-pulse">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>AI is typing…</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex items-center gap-2 border-t p-2 bg-background">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your question..."
                  disabled={loading}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()} variant="default">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <button
          aria-label="Show chat box"
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-lg"
          style={{ width: 56, height: 56, fontSize: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}
          onClick={() => setVisible(true)}
          type="button"
        >
          <span role="img" aria-label="Chat" style={{ fontSize: 28 }}>
            💬
          </span>
        </button>
      )}
    </>
  );
};
