import { useMutation } from "@tanstack/react-query";
import type { Message } from "../types/message";
import type { AiTextSession } from "../types/ai";

export const useSendMessage = ({
  messages,
  setMessages,
  setPendingMessage,
  session,
}: {
  messages: Array<Message>;
  setMessages: (messages: Array<Message>) => void;
  setPendingMessage: (message: string | null) => void;
  session: AiTextSession | null;
}) =>
  useMutation({
    mutationFn: async (message: string) => {
      if (!session) {
        throw new Error("No AI session available");
      }

      const previousMessages = [...messages];

      const userMessage: Message = {
        id: getRandomString(),
        from: "user",
        message,
      };
      setMessages([userMessage, ...previousMessages]);

      const stream = session.promptStreaming(message);
      let finalResponse = "";
      for await (const response of stream) {
        finalResponse = response;
        setPendingMessage(response);
      }

      if (finalResponse === "") {
        finalResponse = "I'm sorry, I don't have a response for that.";
      }

      const assistantMessage: Message = {
        id: getRandomString(),
        from: "assistant",
        message: finalResponse,
      };

      setMessages([assistantMessage, userMessage, ...previousMessages]);
    },
  });

function getRandomString() {
  const rand1 = Math.random().toString(36).substring(7);
  const rand2 = Math.random().toString(36).substring(7);
  return `${rand1}${rand2}`;
}
