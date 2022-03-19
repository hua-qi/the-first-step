let lenStrObj = {
  // A string representing 2 lines written on one line
  str01: "two\nlines",

  // A one-line string written on 3 lines：
  str02: "one\
  long\
  line",
  // A two-line string written on two lines
  str03: `the newline character at the end of this line
  is included literally in this string
  `,
};
console.log(lenStrObj);
