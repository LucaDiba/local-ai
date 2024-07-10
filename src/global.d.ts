declare global {
  interface WindowOrWorkerGlobalScope {
    readonly ai?: {
      canCreateTextSession(): Promise<"readily" | "after-download" | "no">;
      createTextSession(
        options?: Partial<AITextSessionOptions>
      ): Promise<AITextSession>;
      defaultTextSessionOptions(): Promise<AITextSessionOptions>;
    };
  }
}

type AITextSession = {
  prompt(input: string): Promise<string>;
  promptStreaming(input: string): AsyncIterable<string>;
  destroy(): void;
  clone(): AITextSession; // Not yet implemented!
};

type AITextSessionOptions = {
  topK: number;
  temperature: number;
};
