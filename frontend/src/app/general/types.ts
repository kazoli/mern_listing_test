// General type mapping
export type tTypeMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key];
};

// General type to key - value pair object
export type tObject = { [key: string | number]: string };

// General type to button
export type tButton = {
  text?: string;
  icon?: JSX.Element;
  action: () => void;
};

// General type to list header drop downs
export type tListHeaderActionDropDowns = {
  triggerText: string;
  ignoredOption: string;
  options: tObject;
  action: (value: keyof tObject) => void;
}[];

// General type to an input element
export type tInput = {
  type: string;
  value: string;
  action: (value: string) => void;
  error?: string;
  autocomplete?: string;
  placeholder?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};
