import QRCode from 'qrcode';

/**
 * Utilities for common tasks specific to the browser
 */

export async function copyToClipboard(code: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(code);
    console.log('Code copied to clipboard');
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
    console.log('resizing', width, height);
    window.resizeTo(width, height);

    window.addEventListener('resize', () => {
      window.resizeTo(width, height);
    });
  }
}

export async function generateQRCode(url: string): Promise<string> {
  return QRCode.toDataURL(url);
}


/**
 * Create a one-time code for a new backchannel contact.
 * @returns {string } code The code to use in announce
*/
function getNumericCode(code: string): string {
  let parts = code.split(' ');
  let getIndex = (word) => {
    let index = this.wordlist.indexOf(word);
    if (index < 10) return `00${index}`;
    if (index < 100) return `0${index}`;
    return index;
  };
  let nameplate = getIndex(parts[0]).toString();
  let password = getIndex(parts[1]) + '' + getIndex(parts[2]);
  return `${nameplate} ${password}`;
}

function numericCodeToWords(code: string): string {
  let clean = code.replaceAll(' ', '');
  let getWord = (index) => {
    let word = this.wordlist[parseInt(index)];
    return word;
  };
  let part0 = getWord(clean.slice(0, 3));
  let part1 = getWord(clean.slice(3, 6));
  let part2 = getWord(clean.slice(6, 9));
  return `${part0} ${part1} ${part2}`;
}
