import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { AlertCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleDecode = () => {
    setError("");
    setDecoded(null);

    if (!token.trim()) {
      setError("Please enter a JWT token");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
      toast.success("Token decoded successfully");
    } catch (err) {
      setError("Invalid JWT token format");
      toast.error("Invalid JWT token");
    }
  };

  const handleCopy = () => {
    if (decoded) {
      navigator.clipboard.writeText(JSON.stringify(decoded, null, 2));
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🔐 JWT Token Inspector
        </CardTitle>
        <CardDescription>
          Paste a JWT token to decode and inspect its header and payload
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
          />
        </div>
        
        <Button onClick={handleDecode} className="w-full">
          Decode Token
        </Button>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-md bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {decoded && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Decoded Payload:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="rounded-md overflow-hidden border border-border/50">
              <SyntaxHighlighter
                language="json"
                style={theme === "dark" ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.875rem",
                }}
              >
                {JSON.stringify(decoded, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
