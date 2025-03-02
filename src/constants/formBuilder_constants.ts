export const FORM_BUILDER_FIEDS = {
  title: "title",
  type: "type",
  isRequired: "isRequired",
  isHidden: "isHidden",
  helperText: "helperText",
  value: "value",
};

export const FORM_BUILDER_METADATA = {
  name: "name",
};

export const ADDITIONAL_DATA = {
  NumberMin: "numberMin",
  NumberMax: "numberMax",
  DateMin: "dateMin",
  DateMax: "dateMax",
};
export const QUESTION_TYPES = {
  Text: "Text",
  Description: "Description",
  Email: "Email",
  Number: "Number",
  PhoneNumber: "Phone Number",
  Date: "Date",
  SingleSelect: "Single Select",
  MultiSelect: "Multi Select",

  NumberType: "numberType",
};

export const questionTypesDropdownOptions = [
  QUESTION_TYPES.Text,
  QUESTION_TYPES.Description,
  QUESTION_TYPES.Email,
  QUESTION_TYPES.Number,
  QUESTION_TYPES.PhoneNumber,
  QUESTION_TYPES.Date,
  QUESTION_TYPES.SingleSelect,
  QUESTION_TYPES.MultiSelect,
];

export const NUMBER_TYPE_SUBTYPES = {
  Default: "Default",
  Years: "Years",
  Range: "Range",
  Percentage: "Percentage",
};

export const numberTypeSubtypesDropdownOptions = [
  NUMBER_TYPE_SUBTYPES.Default,
  NUMBER_TYPE_SUBTYPES.Years,
  NUMBER_TYPE_SUBTYPES.Range,
  NUMBER_TYPE_SUBTYPES.Percentage,
];
