const crypto = require('crypto');

const secret = crypto.randomBytes(48).toString('base64').replace(/[\/=]/g, '');

console.log(secret);
