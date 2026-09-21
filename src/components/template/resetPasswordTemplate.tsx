import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Text,
} from "@react-email/components";
import { ResetPasswordTemplateProps } from "@/types/template";
import { siteConfig } from "@/config/site";

export function ResetPasswordTemplate({ locale, resetUrl, messages }: ResetPasswordTemplateProps) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{messages.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column style={cardPad}>
              <Text style={brand}>{siteConfig.name}</Text>
              <Heading style={heading}>{messages.heading}</Heading>

              <Text style={text}>{messages.greeting}</Text>
              <Text style={text}>{messages.intro}</Text>

              <Button href={resetUrl} style={button}>
                {messages.button}
              </Button>

              <Text style={expiry}>{messages.expiry}</Text>

              <Hr style={hr} />

              <Text style={footnote}>{messages.ignore}</Text>
              <Text style={footnote}>{siteConfig.url}</Text>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "24px 12px",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "560px",
  margin: "0 auto",
};

const cardPad = {
  padding: "28px",
};

const brand = {
  fontSize: "12px",
  fontWeight: "bold" as const,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#987032",
  margin: "0 0 18px",
};

const heading = {
  fontSize: "22px",
  lineHeight: "30px",
  margin: "0 0 12px",
  color: "#111111",
};

const text = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#333333",
  margin: "0 0 14px",
};

const button = {
  backgroundColor: "#987032",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold" as const,
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
  margin: "6px 0 10px",
};

const expiry = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#666666",
  margin: "0",
};

const hr = {
  borderColor: "#eeeeee",
  margin: "24px 0 16px",
};

const footnote = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#888888",
  margin: "0 0 8px",
};
