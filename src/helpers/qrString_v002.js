import * as yup from "yup";
import { qrSchema } from "../schemas/qrSchema";
import { Base64 } from "js-base64";

export const generateQRCodeString_v002 = async ({
  receiver,
  account,
  amount,
  currency = "UAH",
  receiverCode,
  paymentPurpose,
  displayText,
}) => {
  try {
    await qrSchema.validate(
      {
        receiver,
        account,
        amount,
        currency,
        receiverCode,
        paymentPurpose,
        displayText,
      },
      { abortEarly: false }
    );
    // Перелік полів для версії 002
    const startCode = "https://bank.gov.ua/qr/"; // Код старту застосунку (https://bank.gov.ua/ua/qr/)
    const serviceTag = "BCD\n"; // Службова мітка
    const formatVersion = "002\n"; // Версія формату
    const encoding = "1\n"; // Кодування
    const functionTag = "UCT\n"; // Функція

    // Змінні поля
    const bic = "\n"; // BIC, у цій версії формату - зарезервовано
    const formattedReceiver = receiver ? `${receiver}\n` : "\n"; //Прізвище, ім’я, по батькові фізичної особи/найменування юридичної особи
    const formattedAccount = account ? `${account}\n` : "\n"; //Номер рахунку отримувача;
    const formattedAmount = amount ? `${currency}${amount}\n` : "\n"; //Сума та валюта
    const formattedReceiverCode = receiverCode ? `${receiverCode}\n` : "\n"; //ЄДРПОУ /РНОКПП / серію (за наявності) та номер паспорта отримувача
    const paymentPurposeCode = "\n"; // Код цілі в класифікаторі типів платежів RFU (зарезервовано для подальшого використання)
    const reference = "\n"; // Посилання на рахунок (інвойс) RFU(зарезервовано для подальшого використання)
    const formattedPaymentPurpose = paymentPurpose
      ? `${paymentPurpose}\n`
      : "\n"; // Призначення платежу;
    const formattedDisplayText = displayText ? `${displayText}\n` : "\n"; //Відображення дисплей / Додатковий текст

    const formattedString = `${serviceTag}${formatVersion}${encoding}${functionTag}${bic}${formattedReceiver}${formattedAccount}${formattedAmount}${formattedReceiverCode}${paymentPurposeCode}${reference}${formattedPaymentPurpose}${formattedDisplayText}`;
    console.log("formattedString >>>", formattedString);

    const qrString = `${startCode}${Base64.encode(formattedString, true)}`;
    console.log("stringInBase64 >>>", qrString);

    return qrString;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return err.errors.join(", ");
    }
    return "Невідома помилка валідації";
  }
};
