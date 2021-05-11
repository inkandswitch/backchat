import sodium from 'sodium-javascript';

export type EncryptedProtocolMessage = {
  cipher: string;
  nonce: string;
};

export const symmetric = {
  encrypt: function (key: Buffer, msg: string): EncryptedProtocolMessage {
    const nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
    sodium.randombytes_buf(nonce);
    let message = Buffer.from(msg, 'utf-8');
    const cipher = Buffer.alloc(
      message.byteLength + sodium.crypto_secretbox_MACBYTES
    );
    sodium.crypto_secretbox_easy(cipher, message, nonce, key);
    return {
      cipher: cipher.toString('hex'),
      nonce: nonce.toString('hex'),
    };
  },
  decrypt: function (key: Buffer, msg: EncryptedProtocolMessage): string {
    let nonce = Buffer.from(msg.nonce, 'hex');
    let cipher = Buffer.from(msg.cipher, 'hex');
    const plainText = Buffer.alloc(
      cipher.byteLength - sodium.crypto_secretbox_MACBYTES
    );

    sodium.crypto_secretbox_open_easy(plainText, cipher, nonce, key);

    return plainText.toString('utf-8');
  },
};