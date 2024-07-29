import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { generateQRCodeString_v001 } from "../helpers/qrString";

export const PaymentQRCode = ({ data }) => {
  const qrString = generateQRCodeString_v001(data);

  return (
    <div>
      <h1>Платіжний QR-код</h1>
      <QRCode value={qrString} size={256} level="H" includeMargin={true} />
      <p>{qrString}</p>
    </div>
  );
};

PaymentQRCode.propTypes = {
  data: PropTypes.string.isRequired,
};
