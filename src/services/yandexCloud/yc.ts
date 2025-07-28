import AWS from "aws-sdk";

AWS.config.update({
  region: "ru-central1",
  credentials: new AWS.Credentials({
    accessKeyId: process.env.REACT_APP_YANDEX_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_YANDEX_SECRET_ACCESS_KEY || "",
  }),
});

const s3 = new AWS.S3({
  endpoint: "https://storage.yandexcloud.net",
  region: "ru-central1",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});

const BUCKET_NAME = "vacuum";

export { s3, BUCKET_NAME };
