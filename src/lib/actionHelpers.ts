import { CreateClientType } from "@/validation/clients";
import { CreateEventSchema } from "@/validation/events";
import { dateFormatter } from "./utils";

export function clientDataFormatter(formData: CreateClientType) {
  const {
    clientType,
    personalDetails: { firstName, lastName },
    contactDetails: { email, phone },
    addressDetails: { streetAndNumber, postcode, city, region, country },
  } = formData;

  if (formData.clientType === "Individual") {
    return {
      clientType,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      idCardNumber: formData.personalDetails.idCardNumber || null,
      gender: formData.personalDetails.gender,
      email,
      phone: phone || null,
      streetAndNumber: streetAndNumber || null,
      postcode: postcode || null,
      city: city || null,
      region: region || null,
      country: country || null,
      businessName: null,
      taxId: null,
    };
  }

  return {
    clientType,
    businessName: formData.businessDetails.businessName,
    name: formData.businessDetails.businessName,
    taxId: formData.businessDetails.taxId,
    firstName,
    lastName,
    email,
    phone: phone || null,
    streetAndNumber: streetAndNumber || null,
    postcode: postcode || null,
    city: city || null,
    region: region || null,
    country: country || null,
    gender: null,
    idCardNumber: null,
  };
}

export function eventDataFormatter(formData: CreateEventSchema) {
  const { eventDate, eventStartTime, eventEndTime } = dateFormatter(
    formData.dateAndPlace.eventDate,
    formData.dateAndPlace.eventStartTime,
    formData.dateAndPlace.eventEndTime,
  );

  const { weddingKind, ceremonyDate, ceremonyStartTime, ceremonyPlace, ceremonyAddress } =
    formData.dateAndPlace;
  const hasCeremony = weddingKind !== "None";
  const ceremonyStartsAt =
    hasCeremony && ceremonyDate
      ? dateFormatter(ceremonyDate, ceremonyStartTime).eventStartTime
      : null;

  if (formData.eventType.type === "Wedding")
    return {
      name: formData.basics.eventTitle,
      type: "Wedding" as const,
      altType: null,
      status: "Active" as const,
      date: eventDate,
      startsAt: eventStartTime,
      endsAt: eventEndTime,
      place: formData.dateAndPlace.eventPlace,
      address: formData.dateAndPlace.eventAddress,
      guestCount: Number(formData.basics.guestCount),
      message: formData.package.message || null,
      package: formData.package.eventPackage,
      addons: formData.package.addons,
      clientId: formData.basics.client.value,

      wedding: {
        create: {
          bride: formData.basics.wedding.bride,
          groom: formData.basics.wedding.groom,
          brideWitness: formData.basics.wedding.brideWitness,
          groomWitness: formData.basics.wedding.groomWitness,
          brideMother: formData.basics.wedding.brideMother || null,
          brideFather: formData.basics.wedding.brideFather || null,
          groomMother: formData.basics.wedding.groomMother || null,
          groomFather: formData.basics.wedding.groomFather || null,
          weddingKind: weddingKind ?? "None",
          ceremonyStartsAt,
          ceremonyPlace: hasCeremony ? ceremonyPlace || null : null,
          ceremonyAddress: hasCeremony ? ceremonyAddress || null : null,
        },
      },
    };

  return {
    name: formData.basics.eventTitle,
    type: formData.eventType.type,
    altType: formData.eventType.type === "Other" ? formData.eventType.altType : null,
    status: "Active" as const,
    date: eventDate,
    startsAt: eventStartTime,
    endsAt: eventEndTime,
    place: formData.dateAndPlace.eventPlace,
    address: formData.dateAndPlace.eventAddress,
    guestCount: Number(formData.basics.guestCount),
    message: formData.package.message || null,
    package: formData.package.eventPackage,
    addons: formData.package.addons,
    clientId: formData.basics.client.value,
  };
}
