// General type mapping
export type tTypeMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key];
};

// General type for buttons
export type tButtons = {
  text: string;
  action: () => void;
}[];
