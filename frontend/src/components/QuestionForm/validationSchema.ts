import * as Yup from "yup";

export const questionValidationSchema = Yup.object({
  question: Yup.string().required("Required"),
});
