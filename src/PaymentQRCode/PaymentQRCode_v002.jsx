import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./PaymentQRCode.scss";
import { generateQRCodeString_v002 } from "../helpers/qrString_v002";

export const PaymentQRCode_v002 = ({ data }) => {
  const [qrString, setQrString] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const generateQrCode = async () => {
        const result = await generateQRCodeString_v002(data);
        setQrString(result);
        setError("");
      };
      generateQrCode();
    } catch (error) {
      setError(error);
    }
  }, [data]);

  return (
    <div>
      <h1>Платіжний QR-код</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <QRCode value={qrString} size={256} level="H" includeMargin={true} />
          {/* <p className="string-area">{qrString}</p> */}
        </>
      )}
    </div>
  );
};

PaymentQRCode_v002.propTypes = {
  data: PropTypes.shape({
    receiver: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string,
    receiverCode: PropTypes.string.isRequired,
    paymentPurpose: PropTypes.string,
    displayText: PropTypes.string,
  }).isRequired,
};
