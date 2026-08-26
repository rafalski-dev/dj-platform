export type CheckboxDescriptionProps = {
  label: string;
  name: string;
  error?: string | null;
  fieldStyle?: string;
};

export type InputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  inputStyles?: string;
};

export type SelectProps = {
  label: string;
  name: string;
  items: { label: string; value: string | null }[];
  error?: string;
  required?: boolean;
};
