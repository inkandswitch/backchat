import { useEffect, useState } from 'react';
import { Code } from 'backchannel';

import { generateQRCode } from '../web';
import useCountdown from '../hooks/useCountdown';
import { getWordCode } from '../codes';

type QRCodeImage = string;

/**
 * Get a connection code and its corresponding QR Code image string. Automatically refreshes every `refreshRateSec` seconds.
 *
 * @param {CodeType} codeType The code to accept
 * @param {number} timeout The refresh rate in seconds. Default is 60 seconds.
 * @returns {Code} An invite code.
 * @returns {QRCodeImage} Stringified image of a QR Code that accepts the invite code.
 */
export default function useCode(
  timeout: number = 60,
  redeemUrlPath: string
): [code: Code, qrCode: QRCodeImage] {
  const [code, setCode] = useState('');
  const [generatingCode, setGeneratingCode] = useState(false);
  const [qrCode, setQRCode] = useState('');
  const [timeRemaining, resetCountdown] = useCountdown(timeout);

  // Generate new code and reset countdown when timer runs out
  // or if the codeType changes
  useEffect(() => {
    if (!generatingCode && (timeRemaining === 0 || !code.length)) {
      // Clear the code before getting a new one so
      // stale codes don't linger
      setCode('');
      setQRCode('');
      setGeneratingCode(true);

      let code = getWordCode()
      setCode(code);
      setGeneratingCode(false);
      const url = getReedemURL(redeemUrlPath, code);
      console.log('REDEEM URL', url);
      generateQRCode(url).then((qrCode) => setQRCode(qrCode));
      resetCountdown();
    }
  }, [code, generatingCode, timeRemaining, resetCountdown, redeemUrlPath]);

  return [code, qrCode];
}

// `urlPath` should have a leading slash, e.g. `/redeem`
function getReedemURL(urlPath, code) {
  return `${window.location.origin}${urlPath}#${code.replaceAll(' ', '-')}`;
}
