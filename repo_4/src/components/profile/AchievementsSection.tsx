import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Achievement } from "@/lib/types";
import { Trophy, Award, GitBranch, Users } from "lucide-react";
import { motion } from "framer-motion";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const getIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'academic':
        return Trophy;
      case 'project':
        return Award;
      case 'skill':
        return GitBranch;
      case 'community':
        return Users;
      default:
        return Trophy;
    }
  };

  const getColor = (category: Achievement['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-yellow-100 text-yellow-700';
      case 'project':
        return 'bg-blue-100 text-blue-700';
      case 'skill':
        return 'bg-purple-100 text-purple-700';
      case 'community':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = getIcon(achievement.category);
            const colorClass = getColor(achievement.category);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(achievement.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
