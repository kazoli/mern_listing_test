// General type mapping
export type tTypeMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key];
};

// General type for key - value pair object
export type tObject = { [key: string | number]: string };

// General type for button
export type tButton = {
  text: string;
  action: () => void;
};

// General type for list header drop downs
export type tListHeaderActionDropDowns = {
  triggerText: string;
  ignoredOption: string;
  options: tObject;
  action: (value: keyof tObject) => void;
}[];
