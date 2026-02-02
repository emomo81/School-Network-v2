import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/lib/types";
import { Heart, ExternalLink, Github, MoreVertical, Edit, Trash2 } from "lucide-react";
import AvatarGroup from "@/components/ui/avatar-group";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  currentUserId?: string;
  onLike?: (projectId: string) => void;
  onClick?: (projectId: string) => void;
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
}

export function ProjectCard({ project, currentUserId, onLike, onClick, onEdit, onDelete }: ProjectCardProps) {
  const isOwner = currentUserId === project.userId;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
        <div 
          className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden"
          onClick={() => onClick?.(project.id)}
        >
          {isOwner && (
            <div className="absolute top-2 right-2 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(project.id);
                  }}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(project.id);
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
              {project.title.charAt(0)}
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-3">
          <div onClick={() => onClick?.(project.id)}>
            <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>

          {/* Collaborators */}
          {project.collaborators.length > 0 && (
            <AvatarGroup
              items={project.collaborators.map((c) => ({
                id: parseInt(c.userId.split('-')[1] || '0'),
                name: c.userName,
                designation: "Collaborator",
                image: c.userAvatar,
              }))}
              maxVisible={3}
              size="sm"
              className="justify-start"
            />
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike?.(project.id)}
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">{project.likes}</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
