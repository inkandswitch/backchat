import { Code } from '@inkandswitch/backchannel';
import randomBytes from 'randombytes';
import wordlist from './wordlist_en.json'

export enum CodeType {
  WORDS = 'words',
  NUMBERS = 'numbers',
}

export function splitCode(code: Code): [string, string] {
  let sanitizedCode = code.toLowerCase().trim();
  let parts = sanitizedCode.split(' ');
  let mailbox = parts.shift();
  let password = parts.join(' ');
  return [mailbox, password]
}

export function detectCodeType(code: string): CodeType {
  let maybe = parseInt(code[0]);
  if (isNaN(maybe)) return CodeType.WORDS;
  else return CodeType.NUMBERS;
}

export function validCode(code: Code): boolean {
  let codeType = detectCodeType(code);

  switch (codeType) {
    case CodeType.NUMBERS:
      let sanitized = code.toLowerCase().trim().replaceAll(' ', '');
      return sanitized.match(/[0-9]{9}/) !== null;
    case CodeType.WORDS:
      const RE = /[A-z]{3,5}( )[A-z]{3,5}( )[A-z]{3,5}/g;
      let matched = code.toLowerCase().trim().match(RE);
      return matched !== null;
  }
}


/**
 * Create a one-time code for a new backchannel contact.
 * @returns {Code} code The code to use in announce
 */
export function getNumericCode(code: Code): Code {
  let parts = code.split(' ');
  let getIndex = (word) => {
    let index = wordlist.indexOf(word);
    if (index < 10) return `00${index}`;
    if (index < 100) return `0${index}`;
    return index;
  };
  let nameplate = getIndex(parts[0]).toString();
  let password = getIndex(parts[1]) + '' + getIndex(parts[2]);
  return `${nameplate} ${password}`;
}

export function numericCodeToWords(code: Code): Code {
  let clean = code.replaceAll(' ', '');
  let getWord = (index) => {
    let word = wordlist[parseInt(index)];
    return word;
  };
  let part0 = getWord(clean.slice(0, 3));
  let part1 = getWord(clean.slice(3, 6));
  let part2 = getWord(clean.slice(6, 9));
  return `${part0} ${part1} ${part2}`;
}

/**
 * Create a one-time code for a new backchannel contact.
 * @returns {Code} code The code to use in announce
 */
export function getWordCode(): Code {
  // get 2 words
  let getWord = (wordlist: Array<string>) => {
    let bytes = randomBytes(1);
    let index = parseInt(bytes.toString('hex'), 16);
    let word = wordlist[index];
    return word;
  };
  let password = '';
  // first byte 1/256 options, first half of word list
  password += getWord(wordlist.slice(0, 256));
  password += ' ';
  // second byte 1/256, the second half of the word list
  password += getWord(wordlist.slice(256));

  let nameplate = getWord(wordlist) // nameplate can really be anything

  return `${nameplate} ${password}`;
}