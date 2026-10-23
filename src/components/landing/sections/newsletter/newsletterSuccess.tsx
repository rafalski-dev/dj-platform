import { NewsletterSuccessProps } from "@/types/newsletter";

export function NewsletterSuccess({ message }: NewsletterSuccessProps) {
  return (
    <div
      role="status"
      className="bg-success-bg text-success-text border-success-border w-full max-w-130 rounded-xl border p-4.5 text-center"
    >
      {message}
    </div>
  );
}
