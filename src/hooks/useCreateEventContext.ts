import { CreateEventContext } from "@/context/eventContext";
import { useContext } from "react";

export function useCreateEventContext() {
  const eventContext = useContext(CreateEventContext);
  if (!eventContext) throw new Error("Context is provided incorrectly");
  return eventContext;
}
