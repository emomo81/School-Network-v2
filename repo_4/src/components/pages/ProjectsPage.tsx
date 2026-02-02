import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/lib/types";
import { Search, Filter, Plus, FolderKanban } from "lucide-react";
import { toast } from "sonner";

interface ProjectsPageProps {
  projects: Project[];
  currentUserId?: string;
  onEditProject?: (projectId: string) => void;
  onDeleteProject?: (projectId: string) => void;
}

export function ProjectsPage({ projects, currentUserId, onEditProject, onDeleteProject }: ProjectsPageProps) {
  const [localProjects, setLocalProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const handleLike = (projectId: string) => {
    setLocalProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  // Get all unique tech stack items
  const allTech = Array.from(
    new Set(localProjects.flatMap(p => p.techStack))
  ).sort();

  // Filter projects
  const filteredProjects = localProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === "all" || project.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  // Sort projects
  const popularProjects = [...filteredProjects].sort((a, b) => b.likes - a.likes);
  const recentProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const techFilters = ["all", ...allTech.slice(0, 8)];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FolderKanban className="w-8 h-8" />
              Project Showcase
            </h1>
            <p className="text-muted-foreground mt-1">
              Explore student projects and innovations
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {techFilters.map(tech => (
              <Badge
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            {recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    currentUserId={currentUserId}
                    onLike={handleLike}
                    onEdit={onEditProject}
                    onDelete={onDeleteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular">
            {popularProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularProjects.map((project, idx) => (
                  <div key={project.id} className="relative">
                    {idx < 3 && (
                      <Badge
                        className="absolute -top-3 -left-3 z-10"
                        variant={idx === 0 ? "default" : "secondary"}
                      >
                        #{idx + 1} Popular
                      </Badge>
                    )}
                    <ProjectCard
                      project={project}
                      currentUserId={currentUserId}
                      onLike={handleLike}
                      onEdit={onEditProject}
                      onDelete={onDeleteProject}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
