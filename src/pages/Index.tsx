import { ThemeToggle } from "@/components/ThemeToggle";
import { ContextCard } from "@/components/ContextCard";
import { JWTDecoder } from "@/components/JWTDecoder";
import { TokenCounter } from "@/components/TokenCounter";
import { Key, Brain, Coins, MessageSquare, Code2, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const contexts = [
    {
      icon: Key,
      emoji: "🔐",
      title: "API & Security Tokens",
      description: "Authentication credentials used to access protected APIs. JWT (JSON Web Tokens) are commonly used to securely transmit information between parties.",
      example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      learnMoreUrl: "https://jwt.io/introduction",
    },
    {
      icon: Brain,
      emoji: "🧠",
      title: "AI & Language Model Tokens",
      description: "Units of text that language models process. A token can be a word, part of a word, or punctuation. Models like GPT-4 use tokens to understand and generate text.",
      example: "\"Hello world\" = 2 tokens",
      learnMoreUrl: "https://platform.openai.com/tokenizer",
    },
    {
      icon: Coins,
      emoji: "🪙",
      title: "Blockchain Tokens",
      description: "Digital assets on a blockchain representing value, utility, or ownership. Examples include cryptocurrencies (ERC-20) and NFTs (ERC-721).",
      example: "USDT, LINK, or custom ERC-20 tokens",
      learnMoreUrl: "https://ethereum.org/en/developers/docs/standards/tokens/",
    },
    {
      icon: MessageSquare,
      emoji: "💬",
      title: "Linguistic Tokens",
      description: "In linguistics and natural language processing, tokens are individual words or meaningful units extracted from text during tokenization.",
      example: "Sentence → [\"Sentence\"]",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization",
    },
    {
      icon: Code2,
      emoji: "🧩",
      title: "Programming Tokens",
      description: "In compilers and parsers, tokens are the smallest meaningful units of code, such as keywords, operators, or identifiers.",
      example: "const x = 10; → [const, x, =, 10, ;]",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Lexical_analysis",
    },
  ];

  const references = [
    { title: "OAuth 2.0 Tokens", url: "https://oauth.net/2/" },
    { title: "OpenAI Tokenizer", url: "https://platform.openai.com/tokenizer" },
    { title: "ERC-20 Token Standard", url: "https://eips.ethereum.org/EIPS/eip-20" },
    { title: "JWT.io", url: "https://jwt.io/" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Token Explorer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://github.com/doneya-app/token"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Token
            </span>
            : One word. Many meanings.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore how a single concept connects AI, security, and language.
          </p>
          <div className="text-base text-muted-foreground max-w-2xl mx-auto">
            <p className="mb-2">
              <strong>Norsk:</strong> "Token" betyr en informasjonsenhet som kan representere autentisering, 
              data i AI-modeller, eller verdier i blockchain.
            </p>
            <p>
              <strong>English:</strong> A "token" is a unit of information that can represent authentication, 
              data in AI models, or value in blockchain systems.
            </p>
          </div>
        </div>
      </section>

      {/* Contexts Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Understanding Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contexts.map((context, idx) => (
            <ContextCard key={idx} {...context} />
          ))}
        </div>
      </section>

      <Separator className="container mx-auto my-12" />

      {/* Interactive Tools */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Interactive Tools</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <JWTDecoder />
          <TokenCounter />
        </div>
      </section>

      <Separator className="container mx-auto my-12" />

      {/* References */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">References & Standards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {references.map((ref, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="h-auto py-4 px-6 justify-between group hover:border-primary/50"
              asChild
            >
              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                <span className="text-left">{ref.title}</span>
                <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Created by{" "}
            <a
              href="https://kristoffer.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Kristoffer
            </a>
          </p>
          <p className="mb-2">Educational resource exploring the multifaceted concept of "token"</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            <a
              href="https://github.com/doneya-app/token"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
