
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imageUrl?: string;
  name?: string;
}

export const UserAvatar = ({ imageUrl, name }: UserAvatarProps) => {
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={imageUrl || ""} alt={name || "User"} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};
