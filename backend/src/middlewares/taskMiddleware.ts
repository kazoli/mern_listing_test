import { errorTrigger } from '../middlewares/errorMiddleware';
import { tTaskValidation } from '../types/taskTypes';
import { validateText, validateBoolean } from './validationMiddleware';

// validation of values of a task
export const taskValidation: tTaskValidation = (values, res) => {
  let error;

  // validate name and trim white spaces
  values.name = values.name.trim();
  error = validateText('Task name', values.name, 3, 200);
  if (error) {
    errorTrigger(res, 422, error);
  }

  if (typeof values.complete !== 'boolean') {
    // validate complete is boolean
    error = validateBoolean('Complete', values.complete);
    if (error) {
      errorTrigger(res, 422, error);
    }
    // create a real boolean if 0, 1 or string form was sent
    values.complete = JSON.parse(values.complete) ? true : false;
  }

  // parse value of tags
  let tags: string[] = [];
  if (values.tags.length) {
    values.tags.forEach((tag) => {
      tag = tag.trim();
      // max number of tags and min and max length of a tag
      if (tag.length > 1 && tags.length <= 10) {
        tags = [...tags, tag.slice(0, 30)];
      }
    });
  }
  // remaining tags will return
  values.tags = tags;

  // return processed and validated data to controller
  return values;
};
