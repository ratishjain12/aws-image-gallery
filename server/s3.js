const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { v4: uuid } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY}`,
    secretAccessKey: `${process.env.ACCESS_SECRET}`,
  },
});

const BUCKET = process.env.BUCKET;

const uploadToS3 = async (file, userid) => {
  const key = `${userid}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);

    return { keyCode: key };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { uploadToS3 };
