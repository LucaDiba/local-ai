import { useState } from "react";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import Markdown from "markdown-to-jsx";
import { useDebounce } from "use-debounce";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Centered } from "./ui/Centered";
import { NoAiError } from "./NoAiError";
import { useIsAiAvailable } from "../hooks/use-is-ai-available";
import { useAiSession } from "../hooks/use-ai-session";
import type { Message } from "../types/message";
import { useSendMessage } from "../hooks/use-send-message";
import { IconSend } from "../assets/icons/send";

export function Chat() {
  const [messagesRef] = useAutoAnimate();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const isAiAvailable = useIsAiAvailable();
  const session = useAiSession();
  const sendMessage = useSendMessage({
    messages,
    setMessages,
    setPendingMessage,
    session: session.data ?? null,
  });

  const [isPendingDebounced] = useDebounce(sendMessage.isPending, 500);
  const isThinking = isPendingDebounced && sendMessage.isPending;

  if (isAiAvailable.isLoading || session.isLoading) {
    return (
      <Centered>
        <LoadingSpinner />
      </Centered>
    );
  }

  const error = isAiAvailable.error || session.error;
  if (error) {
    return (
      <Centered>
        <p className="text-red-500">{error.message}</p>
      </Centered>
    );
  }

  if (isAiAvailable.data !== true) {
    return <NoAiError />;
  }

  if (!session.data) {
    return (
      <Centered>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            session.refetch();
          }}
        >
          Start a new conversation
        </button>
      </Centered>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("#message") as HTMLInputElement;
    sendMessage.mutate(input.value);
    input.value = "";
  };

  return (
    <div className="flex flex-col space-y-4">
      <form className="flex space-x-2" onSubmit={onSubmit}>
        <input
          type="text"
          id="message"
          required
          autoComplete="off"
          className="flex-1 border border-gray-300 rounded-lg p-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg p-2"
        >
          <span>
            <IconSend color="#FFF" />
          </span>
        </button>
      </form>
      <div className="flex flex-col space-y-2" ref={messagesRef}>
        {isThinking && pendingMessage && (
          <AssistantMessage key="pending" message={pendingMessage} />
        )}
        {isThinking && !pendingMessage && <AssistantLoading />}
        {messages.map((message) => {
          if (message.from === "assistant") {
            return (
              <AssistantMessage key={message.id} message={message.message} />
            );
          } else {
            return <UserMessage key={message.id} message={message.message} />;
          }
        })}
      </div>
    </div>
  );
}

function AssistantLoading() {
  return (
    <div className="flex items-start">
      <div className="flex items-center bg-gray-200 p-2 rounded-lg h-9">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce" />
        </span>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start">
      <div className="bg-gray-200 p-2 rounded-lg">
        <p className="text-sm">
          <Markdown>{message}</Markdown>
        </p>
      </div>
    </div>
  );
}

function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex items-end justify-end">
      <div className="bg-blue-500 text-white p-2 rounded-lg">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
