import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Skill } from "@/lib/types";
import { Plus, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface SkillsSectionProps {
  skills: Skill[];
  isEditable?: boolean;
  onEndorse?: (skillId: string) => void;
  onAdd?: () => void;
}

export function SkillsSection({ skills, isEditable = false, onEndorse, onAdd }: SkillsSectionProps) {
  // Sort skills by endorsement count
  const sortedSkills = [...skills].sort((a, b) => b.endorsements.length - a.endorsements.length);
  const topSkills = sortedSkills.slice(0, 3);
  const otherSkills = sortedSkills.slice(3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Skills & Endorsements</CardTitle>
          {isEditable && (
            <Button variant="ghost" size="sm" onClick={onAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Skills */}
        {topSkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Top Skills</h4>
            {topSkills.map((skill) => (
              <SkillItem key={skill.id} skill={skill} onEndorse={onEndorse} featured />
            ))}
          </div>
        )}

        {/* Other Skills */}
        {otherSkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Other Skills</h4>
            <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <SkillItem key={skill.id} skill={skill} onEndorse={onEndorse} compact />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SkillItem({ 
  skill, 
  onEndorse, 
  featured = false,
  compact = false 
}: { 
  skill: Skill; 
  onEndorse?: (skillId: string) => void;
  featured?: boolean;
  compact?: boolean;
}) {
  const endorsementCount = skill.endorsements.length;

  if (compact) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEndorse?.(skill.id)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
          >
            <span className="font-medium">{skill.name}</span>
            {endorsementCount > 0 && (
              <Badge variant="outline" className="h-5 px-1.5 text-xs">
                {endorsementCount}
              </Badge>
            )}
          </motion.button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <EndorsementsList skill={skill} onEndorse={onEndorse} />
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="flex-1">
        <h4 className="font-semibold">{skill.name}</h4>
        <p className="text-sm text-muted-foreground">
          {endorsementCount} {endorsementCount === 1 ? 'endorsement' : 'endorsements'}
        </p>
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEndorse?.(skill.id)}
            className="gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Endorse
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <EndorsementsList skill={skill} onEndorse={onEndorse} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function EndorsementsList({ skill, onEndorse }: { skill: Skill; onEndorse?: (skillId: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{skill.name}</h4>
        <Badge variant="secondary">{skill.endorsements.length}</Badge>
      </div>
      
      {skill.endorsements.length > 0 ? (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {skill.endorsements.map((endorsement, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <img
                src={endorsement.userAvatar}
                alt={endorsement.userName}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{endorsement.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(endorsement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No endorsements yet</p>
      )}

      <Button 
        onClick={() => onEndorse?.(skill.id)} 
        className="w-full" 
        size="sm"
      >
        <ThumbsUp className="w-4 h-4 mr-2" />
        Endorse this skill
      </Button>
    </div>
  );
}
