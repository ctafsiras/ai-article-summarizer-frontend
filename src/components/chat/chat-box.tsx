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
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: DEFAULT_SYSTEM_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
    // Scroll to bottom whenever messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="fixed bottom-6 right-6 w-80 z-50"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.15)', borderRadius: 12 }}
    >
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-72 p-4" ref={scrollRef}>
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
  );
};
