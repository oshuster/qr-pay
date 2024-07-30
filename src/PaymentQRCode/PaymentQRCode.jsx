import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { generateQRCodeString_v001 } from "../helpers/qrString";
import { useEffect, useState } from "react";

export const PaymentQRCode = ({ data }) => {
  const [qrString, setQrString] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const generateQrCode = async () => {
        const result = await generateQRCodeString_v001(data);
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
          <p>{qrString}</p>
        </>
      )}
    </div>
  );
};

PaymentQRCode.propTypes = {
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
