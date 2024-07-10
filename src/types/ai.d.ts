declare global {
  interface WindowOrWorkerGlobalScope {
    readonly ai: {
      canCreateTextSession(): Promise<"readily" | "after-download" | "no">;
      createTextSession(
        options?: Partial<AiTextSessionOptions>
      ): Promise<AiTextSession>;
      defaultTextSessionOptions(): Promise<AiTextSessionOptions>;
    };
  }
}

export type AiTextSession = {
  prompt(input: string): Promise<string>;
  promptStreaming(input: string): AsyncIterable<string>;
  destroy(): void;
};

export type AiTextSessionOptions = {
  topK: number;
  temperature: number;
};

export {};
