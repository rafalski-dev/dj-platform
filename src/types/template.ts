export type ForeignUserTemplateProps = {
  locale: string;
  preview: string;
  heading: string;
  paragraphs: string[];
  button?: { label: string; url: string };
  link?: { label: string; url: string };
  footnote?: string;
};

export type VerifyEmailTemplateProps = {
  locale: string;
  verifyUrl: string;
  messages: {
    preview: string;
    heading: string;
    greeting: string;
    intro: string;
    button: string;
    expiry: string;
    fallback: string;
    ignore: string;
  };
};

export type ResetPasswordTemplateProps = {
  locale: string;
  resetUrl: string;
  messages: {
    preview: string;
    heading: string;
    greeting: string;
    intro: string;
    button: string;
    expiry: string;
    fallback: string;
    ignore: string;
  };
};

export type PasswordChangedTemplateProps = {
  locale: string;
  loginUrl: string;
  messages: {
    preview: string;
    heading: string;
    greeting: string;
    intro: string;
    sessions: string;
    button: string;
    warning: string;
  };
};

export type EmailTemplateProps = {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  place: string;
  message: string;
};
