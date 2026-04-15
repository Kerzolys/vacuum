const { S3Client, PutObjectCommand } = require("@aws-sdk/client3");
const functions = require("firebase-functions");

const s3 = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YANDEX_KEY,
    secretAccessKey: process.env.YANDEX_SECRET,
  },
});

exports.uploadImage = functions.https.onRequest(async (req, res) => {
  try {
    const { fileName, fileType, base64 } = req.body;

    if (!fileName || !fileType || !base64) {
      return res.status(400).send("Missing file data");
    }

    const buffer = Buffer.from(base64, "base64");

    const command = new PutObjectCommand({
      Bucket: process.env.YANDE_BUCKET,
      Key: `images/${fileName}`,
      Body: buffer,
      ContentType: fileType,
      ACL: "public-read",
    });

    await s3.send(command);

    const url = `https://storage.yandexcloud.net/${process.env.YANDE_BUCKET}/images/${fileName}`;

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).send("upload error");
  }
});
