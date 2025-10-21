import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, LucideIcon } from "lucide-react";

interface ContextCardProps {
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
  example?: string;
  learnMoreUrl?: string;
}

export function ContextCard({ icon: Icon, emoji, title, description, example, learnMoreUrl }: ContextCardProps) {
  return (
    <Card className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-3xl">{emoji}</span>
          </div>
        </div>
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      {(example || learnMoreUrl) && (
        <CardContent>
          {example && (
            <div className="rounded-md bg-code-bg p-3 mb-3">
              <code className="text-sm text-code-foreground font-mono">{example}</code>
            </div>
          )}
          {learnMoreUrl && (
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                Learn more <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
