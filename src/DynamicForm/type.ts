type TDropdownOption = {
  id: string;
  value: string | number;
  label: string;
};

export type TFieldConfig = {
  id: string;
  fieldName: string;
  label: string;
  defaultValue?: string | number;
  type: "text" | "number" | "dropdown";
  options?: TDropdownOption[];
  hideField?: (formData: Record<string, string>) => boolean;
};

export type TFormConfig = {
  formName: string;
  id: string;
  fields: TFieldConfig[];
};

export type TFormContainerProps = {
  config: TFormConfig;
};

export type TFormFieldProps = {
  fieldProps: TFieldConfig;
  onChange: (fieldName: string, value: string) => void;
  formValues: Record<string, string>;
};
