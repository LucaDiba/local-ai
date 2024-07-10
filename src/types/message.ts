export type Message = {
  id: string;
  from: "user" | "assistant";
  message: string;
};
