import * as yup from "yup";
import { qrSchema } from "../schemas/qrSchema";
import { Base64 } from "js-base64";

export const generateQRCodeString_v001 = async ({
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
    // Перелік полів для версії 001
    const startCode = " ".repeat(23); // Код старту застосунку (23 пробіли)
    const serviceTag = "BCD\n"; // Службова мітка
    const formatVersion = "001\n"; // Версія формату
    const encoding = "1\n"; // Кодування
    const functionTag = "UCT\n"; // Функція

    // Змінні поля
    const bic = ""; // BIC, у цій версії формату - зарезервовано
    const formattedReceiver = receiver ? `${receiver}\n` : ""; //Прізвище, ім’я, по батькові фізичної особи/найменування юридичної особи
    const formattedAccount = account ? `${account}\n` : ""; //Номер рахунку отримувача;
    const formattedAmount = amount ? `${currency}${amount}\n` : ""; //Сума та валюта
    const formattedReceiverCode = receiverCode ? `${receiverCode}\n` : ""; //ЄДРПОУ /РНОКПП / серію (за наявності) та номер паспорта отримувача
    const paymentPurposeCode = ""; // Код цілі в класифікаторі типів платежів RFU (зарезервовано для подальшого використання)
    const reference = ""; // Посилання на рахунок (інвойс) RFU(зарезервовано для подальшого використання)
    const formattedPaymentPurpose = paymentPurpose ? `${paymentPurpose}\n` : ""; // Призначення платежу;
    const formattedDisplayText = displayText ? `${displayText}\n` : ""; //Відображення дисплей / Додатковий текст

    const formattedString = `${startCode}${serviceTag}${formatVersion}${encoding}${functionTag}${bic}${formattedReceiver}${formattedAccount}${formattedAmount}${formattedReceiverCode}${paymentPurposeCode}${reference}${formattedPaymentPurpose}${formattedDisplayText}`;
    console.log("formattedString >>>", formattedString);

    const qrString = `https://bank.gov.ua/qr/${Base64.encode(formattedString)}`;
    console.log("stringInBase64 >>>", qrString);

    return qrString;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return err.errors.join(", ");
    }
    return "Невідома помилка валідації";
  }
};
