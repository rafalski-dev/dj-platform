import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import { CHATBOT_MESSAGE_MAX_LENGTH } from "@/constants/chatbot";
import { SendIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

type ChatBotInputProps = {
  handleSubmit: (message: string) => void;
  isLoading: boolean;
};

export function ChatBotInput({ handleSubmit, isLoading }: ChatBotInputProps) {
  const t = useTranslations("LandingPage.Chatbot");
  const [newMessage, setNewMessage] = useState("");

  // A <form> gives us Enter-to-send for free
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    handleSubmit(newMessage.trim());
    setNewMessage("");
  }

  return (
    <form onSubmit={onSubmit}>
      <InputGroup className="h-12 pr-1">
        <InputGroupInput
          placeholder={t("placeholder")}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          maxLength={CHATBOT_MESSAGE_MAX_LENGTH}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            variant="default"
            className="text-background"
            aria-label={t("send")}
            disabled={!newMessage.trim() || isLoading}
          >
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
