export interface FieldConfig {
    key: string;
    label: string;
    type: 'text'|'number'|'boolean'|'date';
    required?: boolean;
}

export interface ModelSchema<T>{
    name: string;
    endpoint: string;
    fields: FieldConfig[];
}