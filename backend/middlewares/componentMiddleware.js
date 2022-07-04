// This component serves as commonly used components for controllers
const validator = require("validator");

// GENERAL FIELDS START
const checkName = (value, minLength, maxLength) => {
  // validate and process the value of name
  if (!value) {
    return { error: "Name field cannot be empty or missed" };
  } else {
    value = value.trim();
    if (!value.match(/[a-z0-9]/gi)) {
      return {
        error:
          "Name field needs to contain one number or letter without accents",
      };
    }
    if (value.length < minLength) {
      return {
        error: `Name field needs to be at least ${minLength} characters long`,
      };
    }
    // cut the end of name longer than max value
    return value.slice(0, maxLength);
  }
};
// GENERAL FIELDS START

// COLLECTION START
const collectionValidation = (values) => {
  // call name validation
  values.name = checkName(values.name, 3, 50);
  if (values.name.error) return values.name;
  // return processed and validated data to controller
  return values;
};
// COLLECTION END

// TASK START
const taskValidation = (values) => {
  // call name validation
  values.name = checkName(values.name, 3, 200);
  if (values.name.error) return values.name;

  // check whether the value of complete is boolean
  if (!validator.isBoolean(String(values.complete)))
    return { error: "Complete field needs to be a boolean value" };
  // create a real boolean if 0, 1 or string form have been sent
  values.complete = JSON.parse(values.complete) ? true : false;

  // parse value of tags
  let tags = [];
  if (values.tags.length) {
    values.tags.forEach((element) => {
      element = element.trim();
      // max number of tags and min and max length of a tag
      if (element.length > 1 && tags.length <= 20) {
        tags.push(element.slice(0, 30));
      }
    });
  }
  // remaining tags will return
  values.tags = tags;

  // return processed and validated data to controller
  return values;
};
// TASK END

module.exports = {
  collectionValidation,
  taskValidation,
};
