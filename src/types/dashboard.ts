import { Client } from "../../generated";

export type PageHeaderProps = {
  labelText: string;
  titleText: string;
  buttonText: string;
};

export type ClientStatus = "New" | "Pending" | "Active" | "Completed" | "Cancelled" | "Archived";

export type ClientWithStatus = Client & { status: ClientStatus };

export type CardData = {
  title: string;
};

export type FiltersProps = {
  all: string;
  firstCategory: string;
  secondCategory?: string;
  thirdCategory?: string;
};
