import { Sparkles } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-4 animate-fade-in-up">
      <div className="flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center bg-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="p-4 rounded-2xl bg-muted text-muted-foreground flex items-center gap-2">
        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse-dot-1" />
        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse-dot-2" />
        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse-dot-3" />
      </div>
    </div>
  );
};
