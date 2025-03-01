export type FormBuilderData = {
  id?: string;
  lastUpdated?: string;
  metadata: FormBuilderMetadata;
  components: FormBuilderComponent[];
};
export interface FormBuilderComponent {
  title: string;
  type: string;
  isRequired: boolean;
  isHidden: boolean;
  helperText: string;

  numberType?: string;
  numberMin?: string;
  numberMax?: string;

  additionalProperties?: AdditionalProperties;

  value?: string | number;
  errorMessage?: string;
}

export type AdditionalProperties = {
  numberType?: string;
  numberMin?: number;
  numberMax?: number;
  allowNegative?: boolean;
};
