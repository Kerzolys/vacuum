import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: "https://storage.yandexcloud.net",
  accessKeyId: process.env.REACT_APP_YC_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_YC_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

const BUCKET_NAME = "vacuum";

export { s3, BUCKET_NAME };
