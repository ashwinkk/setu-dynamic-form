import { TFieldConfig } from "./type";

export const getDefaultValues = (fields: TFieldConfig[]) => {
  return fields.reduce((defaultValues, field) => {
    return {
      ...defaultValues,
      [field.fieldName]: field.defaultValue,
    };
  }, {});
};
