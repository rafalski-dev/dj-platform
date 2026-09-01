import { type FieldValues, type Control, type FieldPath } from "react-hook-form";

export type ControlledCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
};

export type ControlledInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  autoComplete?: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
};

export type ControlledSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  list: { label: string; value: string }[];
  required?: boolean;
};

export type ControlledTextareaProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  hint: string;
  required?: boolean;
};
