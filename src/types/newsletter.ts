export type State = {
  serverError: string | undefined;
  status: "success" | "error" | null;
  errors: { email?: string[] | undefined } | null;
  providedEmail: string | undefined;
};

export type NewsletterSuccessProps = {
  message: string;
};
