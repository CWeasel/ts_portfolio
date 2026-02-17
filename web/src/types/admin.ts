export interface FieldConfig {
    key: string;
    label: string;
    type: 'text'|'number'|'boolean'|'date'|'select';
    required?: boolean;
    optionsEndpoint?: string;
    optionLabelKey?: string;
}

export interface ModelSchema<T>{
    name: string;
    endpoint: string;
    fields: FieldConfig[];
}