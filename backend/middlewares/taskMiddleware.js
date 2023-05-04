const { errorTrigger } = require("./errorMiddleware");
const { validateInput, validateBoolean } = require("./validationMiddleware");

// validation of values of a task
const taskValidation = (values) => {
  let error;

  // validate name and trim white spaces
  values.name = values.name.trim();
  error = validateInput("Task name", values.name, 3, 200);
  if (error) {
    errorTrigger(res, 422, error);
  }

  // validate complete is boolean
  error = validateBoolean("Complete", values.complete);
  if (error) {
    errorTrigger(res, 422, error);
  }
  // create a real boolean if 0, 1 or string form was sent
  values.complete = JSON.parse(values.complete) ? true : false;

  // parse value of tags
  let tags = [];
  if (values.tags.length) {
    values.tags.forEach((tag) => {
      tag = tag.trim();
      // max number of tags and min and max length of a tag
      if (tag.length > 1 && tags.length <= 20) {
        tags.push(tag.slice(0, 30));
      }
    });
  }
  // remaining tags will return
  values.tags = tags;

  // return processed and validated data to controller
  return values;
};

module.exports = {
  taskValidation,
};
