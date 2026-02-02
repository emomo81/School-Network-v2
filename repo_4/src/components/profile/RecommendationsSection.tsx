import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recommendation } from "@/lib/types";
import { Plus, Quote } from "lucide-react";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  isEditable?: boolean;
  onRequest?: () => void;
}

export function RecommendationsSection({ 
  recommendations, 
  isEditable = false, 
  onRequest 
}: RecommendationsSectionProps) {
  // Only show published recommendations
  const publishedRecs = recommendations.filter(rec => rec.status === 'published');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recommendations</CardTitle>
          {isEditable && (
            <Button variant="ghost" size="sm" onClick={onRequest}>
              <Plus className="w-4 h-4 mr-2" />
              Request
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {publishedRecs.length > 0 ? (
          <div className="space-y-6">
            {publishedRecs.map((rec) => (
              <div key={rec.id} className="space-y-3 pb-6 border-b last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <img
                    src={rec.fromUserAvatar}
                    alt={rec.fromUserName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{rec.fromUserName}</h4>
                    <p className="text-sm text-muted-foreground">{rec.fromUserHeadline}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rec.relationship}
                    </p>
                  </div>
                </div>
                <div className="relative pl-4 border-l-2 border-primary/20">
                  <Quote className="absolute -left-2 -top-1 w-8 h-8 text-primary/20" />
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "{rec.content}"
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(rec.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No recommendations yet</p>
            {isEditable && (
              <Button onClick={onRequest}>
                Request Recommendation
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
