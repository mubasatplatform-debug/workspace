import { Models } from "@/ai/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useModelId, useReasoningEffort } from "./use-settings";

export function ReasoningEffort() {
  const [modelId] = useModelId();
  const [effort, setEffort] = useReasoningEffort();
  if (modelId !== Models.OpenAIGPT53Codex) {
    return null;
  }

  return (
    <div
      className="flex justify-between items-center p-2 -m-2 rounded cursor-pointer hover:bg-accent/50"
      onClick={() => setEffort(effort === "medium" ? "low" : "medium")}
    >
      <div className="flex-1 space-y-1 pointer-events-none">
        <Label className="text-sm text-foreground" htmlFor="effort-level">
          تفكير أعمق
        </Label>
        <p className="text-sm leading-relaxed text-muted-foreground">
          مع GPT-5.3 Codex تقدر تطلب مستوى تفكير أعلى.
        </p>
      </div>
      <Checkbox
        id="effort-level"
        className="ms-3 pointer-events-none"
        checked={effort === "medium"}
        onCheckedChange={(checked) =>
          setEffort(checked === true ? "medium" : "low")
        }
      />
    </div>
  );
}
