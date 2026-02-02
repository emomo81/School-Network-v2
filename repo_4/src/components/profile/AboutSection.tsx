import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface AboutSectionProps {
  about: string;
  isEditable?: boolean;
  onEdit?: () => void;
}

export function AboutSection({ about, isEditable = false, onEdit }: AboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>About</CardTitle>
          {isEditable && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{about}</p>
      </CardContent>
    </Card>
  );
}
