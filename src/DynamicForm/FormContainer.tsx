import { useMemo, useState, useCallback } from "react";
import { TFormContainerProps, TFormFieldProps } from "./type";
import { getDefaultValues } from "./utils";

const FormContainer = ({ config, onSubmit }: TFormContainerProps) => {
  const [formValues, setFormValue] = useState(getDefaultValues(config.fields));

  const handleFieldChange = useCallback(
    (fieldName: string, value: string) => {
      const updatedFormValue = {
        ...formValues,
        [fieldName]: value,
      };
      console.log(updatedFormValue);

      setFormValue(updatedFormValue);
    },
    [formValues],
  );

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit?.(formValues);
    },
    [formValues],
  );

  return (
    <form id={config.id} name={config.formName} onSubmit={handleOnSubmit}>
      {config.fields.map((fieldProps) => {
        if (fieldProps.hideField?.(formValues)) return null;

        return (
          <FormField
            key={fieldProps.id}
            fieldProps={fieldProps}
            onChange={handleFieldChange}
            formValues={formValues}
          />
        );
      })}
    </form>
  );
};

const FormField = ({ fieldProps, onChange, formValues }: TFormFieldProps) => {
  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = useCallback(
    (event) => {
      onChange?.(fieldProps.fieldName, event?.target?.value);
    },
    [fieldProps.fieldName, onChange],
  );

  const Field = useMemo(() => {
    switch (fieldProps.type) {
      case "text":
      case "number":
        return (
          <input
            type={fieldProps.type}
            name={fieldProps.fieldName}
            defaultValue={fieldProps.defaultValue}
            onChange={handleOnChange}
          />
        );
      case "dropdown":
        return (
          <select
            name={fieldProps.fieldName}
            onChange={handleOnChange}
            value={fieldProps.defaultValue}
          >
            <option key="no-value">--</option>
            {fieldProps.options?.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );
      default:
        return null;
    }
  }, [fieldProps, handleOnChange]);

  return (
    <>
      <span>{fieldProps.label}</span>
      {Field}
    </>
  );
};

export default FormContainer;
