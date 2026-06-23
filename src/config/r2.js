const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
const path = require('path');

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://dummyaccountid.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy_access_key',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy_secret_key',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'foodrescue';
const PUBLIC_R2_URL = process.env.PUBLIC_R2_URL || 'https://pub-xxxxxx.r2.dev';

const generateUploadUrl = async (originalName, mimeType, folder = 'ngos') => {
  const ext = path.extname(originalName);
  const randomName = crypto.randomBytes(16).toString('hex');
  const key = `${folder}/${randomName}${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: mimeType,
  });

  // URL expires in 15 minutes
  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 });
  
  return { 
    uploadUrl, 
    key, 
    publicUrl: `${PUBLIC_R2_URL}/${key}` 
  };
};

const getObjectBytes = async (key, endByte = 4100) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Range: `bytes=0-${endByte}`
  });
  
  try {
    const response = await r2Client.send(command);
    const chunks = [];
    for await (let chunk of response.Body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch (err) {
    throw new Error('Failed to fetch object bytes from R2: ' + err.message);
  }
};

const deleteObject = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  try {
    await r2Client.send(command);
  } catch (err) {
    console.error('Failed to delete object from R2:', err.message);
  }
};

module.exports = {
  r2Client,
  generateUploadUrl,
  getObjectBytes,
  deleteObject,
};
