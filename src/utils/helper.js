export const getError = ({ formik, inputName }) => {
  const errros = formik?.errors[inputName];
  const touched = formik?.touched[inputName];
  return errros && touched && <>{formik.errors[inputName]} </>;
};
