import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: "https://storage.yandexcloud.net",
  region: "ru-central1",
  signatureVersion: "v4",
  credentials: new AWS.Credentials(
    process.env.REACT_APP_YANDEX_ACCESS_KEY_ID || "",
    process.env.REACT_APP_YANDEX_SECRET_ACCESS_KEY || ""
  ),
  s3ForcePathStyle: false,
});

console.log(process.env.REACT_APP_YANDEX_BUCKET_NAME)


export default s3

