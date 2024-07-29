import { useState } from "react";
import "./App.css";
import { PaymentQRCode } from "./PaymentQRCode/PaymentQRCode";

function App() {
  const [qrData, setQrData] = useState({
    receiver: "",
    account: "",
    amount: "",
    receiverCode: "",
    paymentPurpose: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setQrData({ ...qrData, [key]: value });
    console.log(qrData);
  };

  return (
    <div className="container">
      <div className="info-container">
        <label htmlFor="receiver">Отримувач</label>
        <input
          className="info-input"
          name="receiver"
          type="text"
          id="receiver"
          value={qrData.receiver}
          onChange={handleChange}
        />

        <label htmlFor="account">Рахунок отримувача</label>
        <input
          className="info-input"
          name="account"
          type="text"
          id="account"
          value={qrData.account}
          onChange={handleChange}
        />

        <label htmlFor="amount">Сума</label>
        <input
          className="info-input"
          name="amount"
          type="text"
          id="amount"
          value={qrData.amount}
          onChange={handleChange}
        />

        <label htmlFor="receiverCode">РНОКПП/ЄДРПОУ</label>
        <input
          className="info-input"
          name="receiverCode"
          type="text"
          id="receiverCode"
          value={qrData.receiverCode}
          onChange={handleChange}
        />

        <label htmlFor="paymentPurpose">Призначення платежу</label>
        <input
          className="info-input"
          name="paymentPurpose"
          type="text"
          id="paymentPurpose"
          value={qrData.paymentPurpose}
          onChange={handleChange}
        />
      </div>
      <PaymentQRCode data={qrData} />
    </div>
  );
}

export default App;
