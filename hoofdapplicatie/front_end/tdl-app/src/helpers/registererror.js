//Checks when there is a registererror what the error is.
export function checkregistererror(resolve) {
  if ("data" in resolve.error) {
    if (
      "violations" in resolve.error.data &&
      resolve.error.data.violations.length > 0
    ) {
      return resolve.error.data.violations[0].message;
    }
    if ("detail" in resolve.error.data) {
      if (resolve.error.data.toString().includes("usrName")) {
        return "Username already taken";
      }
      if (resolve.error.data.toString().includes("usrMail")) {
        return "Email already taken";
      }
      return resolve.error.data.detail;
    }
  }

  return result;
}
