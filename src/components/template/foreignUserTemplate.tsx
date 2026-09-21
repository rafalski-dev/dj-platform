import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Text,
} from "@react-email/components";
import { ForeignUserTemplateProps } from "@/types/template";
import { siteConfig } from "@/config/site";

export function ForeignUserTemplate({
  locale,
  preview,
  heading,
  paragraphs,
  button,
  link,
  footnote,
}: ForeignUserTemplateProps) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column style={cardPad}>
              <Text style={brand}>{siteConfig.name}</Text>
              <Heading style={headingStyle}>{heading}</Heading>

              {paragraphs.map((paragraph) => (
                <Text key={paragraph} style={text}>
                  {paragraph}
                </Text>
              ))}

              {button && (
                <Button href={button.url} style={buttonStyle}>
                  {button.label}
                </Button>
              )}

              {link && (
                <Text style={text}>
                  <Link href={link.url} style={linkStyle}>
                    {link.label}
                  </Link>
                </Text>
              )}

              <Hr style={hr} />

              {footnote && <Text style={footnoteStyle}>{footnote}</Text>}
              <Text style={footnoteStyle}>{siteConfig.url}</Text>
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

const headingStyle = {
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

const buttonStyle = {
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

const linkStyle = {
  color: "#987032",
  fontSize: "14px",
};

const hr = {
  borderColor: "#eeeeee",
  margin: "24px 0 16px",
};

const footnoteStyle = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#888888",
  margin: "0 0 4px",
};
