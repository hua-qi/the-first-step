import type { IValidator, IRegexpValidator } from "./type";

const regexpValidator: IRegexpValidator = (regexpString, errorString) => {
  const validator: IValidator = (rule, value, callback) => {
    let pattern = new RegExp(regexpString);

    if (!pattern.test(value)) {
      return Promise.reject(errorString);
    }

    return Promise.resolve();
  };

  return validator;
};

export { regexpValidator };
