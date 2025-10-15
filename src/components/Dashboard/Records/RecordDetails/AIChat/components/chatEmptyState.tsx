import { Sparkles, FlaskConical, Stethoscope } from "lucide-react";

const PromptSuggestion = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <button className="w-full text-left p-3 border border-border rounded-lg hover:bg-accent transition-colors">
    <div className="flex items-center gap-3">
      {icon}
      <p className="text-sm font-medium">{text}</p>
    </div>
  </button>
);

export const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <Sparkles className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        AI Assistant
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        Ask me anything about this patient's records or general medical queries.
      </p>

      <div className="w-full max-w-md space-y-3">
        <PromptSuggestion
          icon={<Stethoscope className="h-5 w-5 text-primary" />}
          text="Summarize the patient's recent history"
        />
        <PromptSuggestion
          icon={<FlaskConical className="h-5 w-5 text-primary" />}
          text="What are the potential side effects of Metformin?"
        />
      </div>
    </div>
  );
};
