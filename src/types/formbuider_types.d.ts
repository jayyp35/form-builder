export type FormBuilderData = FormBuilderComponent[];
export interface FormBuilderComponent {
  title: string;
  type: string;
  isRequired: boolean;
  isHidden: boolean;
  helperText: string;

  numberType?: string;
  numberMin?: string;
  numberMax?: string;
}
