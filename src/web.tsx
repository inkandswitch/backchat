import QRCode from 'qrcode';

/**
 * Utilities for common tasks specific to the browser
 */

export async function copyToClipboard(code: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(code);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

export async function forceScreenSize(width, height) {
  let isStandardsCompliantPlatform = window.matchMedia(
    '(display-mode: standalone)'
  ).matches;
  //@ts-ignore
  let isIOS = window.navigator?.standalone === true;
  let installedApp = isStandardsCompliantPlatform || isIOS;
  console.log(installedApp);

  if (installedApp) {
    window.resizeTo(width, height);

    window.addEventListener('resize', () => {
      window.resizeTo(width, height);
    });
  }
}

export async function generateQRCode(url: string): Promise<string> {
  return QRCode.toDataURL(url);
}