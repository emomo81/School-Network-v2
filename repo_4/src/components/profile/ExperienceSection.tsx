import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/lib/types";
import { Plus, Briefcase, Calendar } from "lucide-react";

interface ExperienceSectionProps {
  experience: Experience[];
  isEditable?: boolean;
  onAdd?: () => void;
}

export function ExperienceSection({ experience, isEditable = false, onAdd }: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Experience</CardTitle>
          {isEditable && (
            <Button variant="ghost" size="sm" onClick={onAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-semibold text-lg">{exp.title}</h4>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.current ? 'Present' : new Date(exp.endDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  {exp.current && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
