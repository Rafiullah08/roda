
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChatWindow = ({ isOpen, onClose }: LiveChatWindowProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "agent"; timestamp: Date }[]>([
    {
      text: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    setMessages([...messages, { 
      text: message, 
      sender: "user",
      timestamp: new Date() 
    }]);
    
    setMessage("");
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our team will get back to you shortly.", 
        sender: "agent",
        timestamp: new Date() 
      }]);
    }, 1000);
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={cn(
        "absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden",
        isOpen ? "h-96 opacity-100" : "h-0 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h3 className="font-medium">Customer Support</h3>
          <div className="text-xs">Online</div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "mb-3 max-w-[80%] p-3 rounded-lg",
                msg.sender === "user"
                  ? "ml-auto bg-primary text-white rounded-br-none"
                  : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-70 block mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="button" variant="ghost" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LiveChatWindow;
