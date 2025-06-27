
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Conversation } from "@/services/messagingService";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];
  activeChat: string | null;
  setActiveChat: (id: string | null) => void;
  isLoading: boolean;
}

const ConversationList = ({
  conversations,
  activeChat,
  setActiveChat,
  isLoading,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    (conversation.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No conversations found</p>
          </div>
        ) : (
          <div>
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeChat === conversation.id}
                onClick={() => setActiveChat(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
