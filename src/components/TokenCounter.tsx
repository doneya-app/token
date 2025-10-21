import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { encodingForModel } from "js-tiktoken";
import { Badge } from "@/components/ui/badge";

export function TokenCounter() {
  const [text, setText] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [tokens, setTokens] = useState<number[]>([]);

  useEffect(() => {
    if (!text) {
      setTokenCount(0);
      setTokens([]);
      return;
    }

    try {
      const enc = encodingForModel("gpt-4");
      const encoded = enc.encode(text);
      setTokenCount(encoded.length);
      setTokens(Array.from(encoded));
    } catch (err) {
      console.error("Error encoding text:", err);
    }
  }, [text]);

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🧠 AI Token Counter
        </CardTitle>
        <CardDescription>
          Count OpenAI-style tokens in your text (GPT-4 tokenizer)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Enter text to count tokens..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div>
            <p className="text-sm text-muted-foreground">Token Count</p>
            <p className="text-3xl font-bold text-primary">{tokenCount}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Characters</p>
            <p className="text-2xl font-semibold">{text.length}</p>
          </div>
        </div>

        {tokens.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Token IDs (first 20):</p>
            <div className="flex flex-wrap gap-1">
              {tokens.slice(0, 20).map((token, idx) => (
                <Badge key={idx} variant="secondary" className="font-mono text-xs">
                  {token}
                </Badge>
              ))}
              {tokens.length > 20 && (
                <Badge variant="outline" className="text-xs">
                  +{tokens.length - 20} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
