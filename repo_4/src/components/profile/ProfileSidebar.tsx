import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User } from "@/lib/types";
import { Eye, TrendingUp, Star, Award } from "lucide-react";

interface ProfileSidebarProps {
  profile: User;
  connectionCount: number;
  profileViews?: number;
  profileStrength?: number;
}

export function ProfileSidebar({ 
  profile, 
  connectionCount,
  profileViews = 89,
  profileStrength = 85 
}: ProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Profile Strength Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Strength</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-semibold">{profileStrength}%</span>
          </div>
          <Progress value={profileStrength} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {profileStrength >= 90 
              ? "Excellent! Your profile stands out."
              : profileStrength >= 70
              ? "Great progress! Add more projects to reach 90%."
              : "Keep building your profile to increase visibility."}
          </p>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Profile views</span>
            </div>
            <span className="font-semibold">{profileViews}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Post impressions</span>
            </div>
            <span className="font-semibold">1.2k</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Search appearances</span>
            </div>
            <span className="font-semibold">45</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Award className="w-4 h-4 mr-2" />
            Request Recommendation
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Badge className="w-4 h-4 mr-2" />
            Share Profile
          </Button>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Add more skills</p>
            <p className="text-xs text-muted-foreground">
              Increase visibility by adding relevant skills
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Upload a project</p>
            <p className="text-xs text-muted-foreground">
              Showcase your work to stand out
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
