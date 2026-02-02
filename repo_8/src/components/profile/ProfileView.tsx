import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProfileDialog } from "./EditProfileDialog";
import { User } from "@/lib/types";
import { RiEditLine, RiMailLine } from "@remixicon/react";

interface ProfileViewProps {
  user: User;
  isOwnProfile: boolean;
  onUpdateProfile?: (updates: Partial<User>) => Promise<void>;
  onSendMessage?: () => void;
}

export function ProfileView({
  user,
  isOwnProfile,
  onUpdateProfile,
  onSendMessage,
}: ProfileViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-navy-200 shadow-lg overflow-hidden">
        {/* Header with gradient */}
        <div className="h-32 bg-gradient-to-br from-secondary via-blue-400 to-accent" />

        <CardHeader className="relative -mt-16 pb-0">
          <div className="flex items-end gap-4">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-secondary text-white text-3xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy-800">
                    {user.name}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                {isOwnProfile ? (
                  <Button
                    onClick={() => setIsEditDialogOpen(true)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <RiEditLine className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    onClick={onSendMessage}
                    size="sm"
                    className="gap-2 bg-secondary hover:bg-blue-400"
                  >
                    <RiMailLine className="h-4 w-4" />
                    Message
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <Badge className="mt-1 bg-navy-800">{user.department}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year of Study</p>
              <p className="font-semibold text-navy-800 mt-1">Year {user.year}</p>
            </div>
          </div>

          {user.bio && (
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="text-navy-800 mt-1">{user.bio}</p>
            </div>
          )}

          {user.skills.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-accent/20 text-navy-800"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isOwnProfile && onUpdateProfile && (
        <EditProfileDialog
          user={user}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={onUpdateProfile}
        />
      )}
    </motion.div>
  );
}
