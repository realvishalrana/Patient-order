export const getErrors = ({
  objKey = false,
  inputName,
  formik,
  index = false,
  dynamicError = false,
}) => {
  if (dynamicError) {
    const error =
      formik.touched?.[objKey]?.[index]?.[inputName] &&
      formik.errors?.[objKey]?.[index]?.[inputName];
   

    return error;
  } else if (objKey) {
    return (
      formik?.touched?.[objKey]?.[inputName] &&
      formik?.errors?.[objKey]?.[inputName]
    );
  } else {
    const touched = formik?.touched?.[inputName];
    const errors = formik?.errors?.[inputName];
    return touched && typeof errors === "string" ? errors : "";
  }
};
