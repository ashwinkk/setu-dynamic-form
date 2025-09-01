import FormContainer from "./DynamicForm";
import { TFormConfig } from "./DynamicForm/type";

export function App() {
  const formConfig: TFormConfig = {
    formName: "name",
    id: "testform",
    fields: [
      {
        id: "firstname",
        fieldName: "name",
        label: "Name",
        type: "text",
        defaultValue: "test",
      },
      {
        id: "country",
        fieldName: "country",
        label: "Country",
        type: "dropdown",
        defaultValue: "",
        options: [
          {
            id: "india",
            value: "india",
            label: "India",
          },
          {
            id: "japan",
            value: "japan",
            label: "Japan",
          },
          {
            id: "indonesia",
            value: "indonesia",
            label: "Indonesia",
          },
        ],
      },
      {
        id: "passport-number",
        fieldName: "passportNumber",
        type: "text",
        label: "Passport Number",
        hideField: (data) => {
          return data?.country === "india";
        },
      },
    ],
  };

  return <FormContainer config={formConfig} />;
}
