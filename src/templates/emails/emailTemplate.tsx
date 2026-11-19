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
import { EmailTemplateProps } from "@/types/template";

export function EmailTemplate({
  fullName,
  email,
  phone,
  eventDate,
  eventType,
  place,
  message,
  inquiryUrl,
}: EmailTemplateProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New booking enquiry from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column style={cardPad}>
              <Heading style={heading}>New booking enquiry</Heading>
              <Text style={intro}>A new booking enquiry has just arrived.</Text>

              <Hr />

              <Text style={label}>Full name</Text>
              <Text style={value}>{fullName}</Text>

              <Text style={label}>Email</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`}>{email}</Link>
              </Text>

              <Text style={label}>Phone</Text>
              <Text style={value}>{phone}</Text>

              <Text style={label}>Event type</Text>
              <Text style={value}>{eventType}</Text>

              <Text style={label}>Event date</Text>
              <Text style={value}>{eventDate || "—"}</Text>

              <Text style={label}>Place</Text>
              <Text style={value}>{place || "—"}</Text>

              <Text style={label}>Message</Text>
              <Text style={message_}>{message || "—"}</Text>

              {/* read the details first, then decide */}
              <Hr style={divider} />
              <Button href={inquiryUrl} style={buttonStyle}>
                Review enquiry
              </Button>
              <Text style={hint}>Accept or reject it in the admin panel.</Text>
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

const heading = {
  fontSize: "22px",
  margin: "0 0 4px",
  color: "#111111",
};

const intro = {
  fontSize: "14px",
  margin: "0 0 8px",
  color: "#666666",
};

// same as the client emails (foreignUserTemplate)
const buttonStyle = {
  backgroundColor: "#987032",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold" as const,
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
  margin: "4px 0 4px",
};

const hint = {
  fontSize: "13px",
  margin: "0",
  color: "#888888",
};

const divider = {
  margin: "24px 0 20px",
};

const label = {
  fontSize: "12px",
  fontWeight: "bold" as const,
  color: "#888888",
  margin: "14px 0 2px",
};

const value = {
  fontSize: "15px",
  color: "#111111",
  margin: "0",
};

const message_ = {
  fontSize: "15px",
  color: "#111111",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};
