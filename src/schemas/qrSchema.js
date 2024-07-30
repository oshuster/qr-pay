import * as yup from "yup";

export const qrSchema = yup.object().shape({
  receiver: yup
    .string()
    .max(38, "Поле 'Отримувач' перевищує дозволену довжину")
    .required("Поле 'Отримувач' є обов'язковим"),
  account: yup
    .string()
    .max(30, "Поле 'Рахунок отримувача' перевищує дозволену довжину")
    .required("Поле 'Рахунок отримувача' є обов'язковим"),
  amount: yup
    .number()
    .max(999999999.99, "Поле 'Сума' перевищує дозволенні обмеження")
    .required("Поле 'Сума' є обов'язковим"),
  currency: yup.string().default("UAH"),
  receiverCode: yup.string().required("Поле 'Код отримувача' є обов'язковим"),
  paymentPurpose: yup.string(),
  displayText: yup.string(),
});
