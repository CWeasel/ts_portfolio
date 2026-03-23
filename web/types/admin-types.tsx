export interface FieldConfig {
    key: string;
    label: string;
    type: 'text'|'number'|'boolean'|'date'|'select';
    required?: boolean;
    optionsEndpoint?: string;
    optionLabelKey?: string;
    multiple?: boolean;
}

export interface ModelSchema<T>{
    name: string;
    endpoint: string;
    fields: FieldConfig[];
}