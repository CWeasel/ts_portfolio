export interface FieldConfig {
    key: string;
    label: string;
    type: 'text'|'number'|'boolean'|'date'|'select';
    required?: boolean;
    optionsEndpoint?: string;
    optionLabelKey?: string;
    multiple?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ModelSchema<T>{
    name: string;
    endpoint: string;
    fields: FieldConfig[];
}