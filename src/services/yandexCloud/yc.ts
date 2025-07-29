import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ru-central1",
  credentials: {
    accessKeyId: process.env.REACT_APP_YANDEX_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_YANDEX_SECRET_ACCESS_KEY!,
  },
  endpoint: "https://storage.yandexcloud.net",
  forcePathStyle: false,
});

export default s3Client;
