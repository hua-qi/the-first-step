interface IValidator {
  (rule: any, value: string, callback?: Function): Promise<any>;
}

interface IRegexpValidator {
  (regexpString: string, errorString: string): IValidator;
}

export type { IValidator, IRegexpValidator };
