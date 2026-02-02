import { useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { AboutSection } from "@/components/profile/AboutSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { AchievementsSection } from "@/components/profile/AchievementsSection";
import { RecommendationsSection } from "@/components/profile/RecommendationsSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Profile, Project } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface ProfilePageProps {
  profile: Profile;
  projects: Project[];
  isOwnProfile?: boolean;
}

export function ProfilePage({ profile, projects, isOwnProfile = false }: ProfilePageProps) {
  const [localProjects, setLocalProjects] = useState(projects);

  const handleEndorseSkill = (skillId: string) => {
    toast.success("Skill endorsed!");
  };

  const handleLikeProject = (projectId: string) => {
    setLocalProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, likes: p.likes + 1 } : p
      )
    );
    toast.success("Project liked!");
  };

  const handleConnect = () => {
    toast.success("Connection request sent!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onConnect={handleConnect}
            />

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects ({localProjects.length})</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <AboutSection about={profile.about} isEditable={isOwnProfile} />
                <SkillsSection
                  skills={profile.skills}
                  isEditable={isOwnProfile}
                  onEndorse={handleEndorseSkill}
                />
                <ExperienceSection
                  experience={profile.experience}
                  isEditable={isOwnProfile}
                />
              </TabsContent>

              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {localProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onLike={handleLikeProject}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsSection achievements={profile.achievements} />
              </TabsContent>

              <TabsContent value="recommendations">
                <RecommendationsSection
                  recommendations={profile.recommendations}
                  isEditable={isOwnProfile}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ProfileSidebar
                profile={profile}
                connectionCount={profile.connectionCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
