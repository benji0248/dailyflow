import crypto from 'crypto';
// Generar Access Key (clave pública)
const accessKey = crypto.randomBytes(32).toString('hex');
console.log('Access Key:', accessKey);

// Generar Secret Key (clave privada)
const secretKey = crypto.randomBytes(64).toString('hex');
console.log('Secret Key:', secretKey);