import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { User } from "@/types/types";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex items-center justify-between border-b px-4 py-3 md:px-6">
      <div>
        <h1 className="text-lg font-semibold">{user.role === "doctor" ? "Dr." : ""} {user.firstName} {user.lastName}</h1>
        <p className="text-sm text-muted-foreground">
          View and update your personal details, medical information, and preferences.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-[200px] pl-8"
          />
        </div>
        <Button size="sm" variant="outline">
          Edit Profile
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.profilePicture || "/placeholder-avatar.jpg"} alt="User Avatar" />
          <AvatarFallback>{user.firstName[0]}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default ProfileHeader;
