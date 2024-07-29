export const generateQRCodeString_v001 = ({
  receiver,
  account,
  amount,
  currency = "UAH",
  receiverCode,
  paymentPurpose,
  displayText,
}) => {
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

  if (formattedReceiver.length > 38) {
    console.log("formattedReceiver.length  >>>", formattedReceiver.length);
    return "Поле 'Отримувач' перевищує дозволену довжину";
  }

  if (formattedAccount.length > 30) {
    console.log(formattedAccount);
    console.log("formattedAccount.length", formattedAccount.length);
    return "Поле 'Рахунок отримувача' перевищує дозволену довжину";
  }

  if (formattedAmount > 999999999.99) {
    return "Поле 'Сума' перевищує дозволенні обмеження";
    //  потрібно також коригувати формат суми
    // якщо сума містить копійки, то обовязковий формат xx.xx
    // якщо сума не містить копійок то допускається їхня відсутність
  }

  const qrString = `${startCode}${serviceTag}${formatVersion}${encoding}${functionTag}${bic}${formattedReceiver}${formattedAccount}${formattedAmount}${formattedReceiverCode}${paymentPurposeCode}${reference}${formattedPaymentPurpose}${formattedDisplayText}`;
  console.log(qrString);

  return qrString;
};
