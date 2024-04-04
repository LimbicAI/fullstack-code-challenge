import * as Yup from "yup";

export const questionValidationSchema = Yup.object({
  answer: Yup.string().required("Required"),
});
