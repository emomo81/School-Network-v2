import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";
import { MapPin, Calendar, CheckCircle, Mail, Briefcase } from "lucide-react";

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onConnect?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile = false, onEdit, onConnect }: ProfileHeaderProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm overflow-hidden border">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        <img 
          src={profile.coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
            />
            {profile.isVerified && (
              <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isOwnProfile ? (
              <Button variant="outline" onClick={onEdit}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button onClick={onConnect}>
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Name and Headline */}
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {profile.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{profile.headline}</p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{profile.department}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{profile.year}</span>
            </div>
          </div>

          {/* Connection Count */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm">
              <strong className="text-foreground">{profile.connectionCount}</strong> connections
            </span>
            {profile.isMentor && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                Mentor
              </Badge>
            )}
            <Badge variant="secondary">{profile.faculty}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
