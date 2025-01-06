import AWS from 'aws-sdk'

AWS.config.update({
  region: 'ru-central1',
  logger: console,
});

const s3 = new AWS.S3({
  endpoint: 'https://storage.yandexcloud.net',
  accessKeyId: process.env.REACT_APP_YANDEX_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_YANDEX_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
})

const bucketName = 'vacuum-app';

const listObjects = async () => {
  try {
    const result = await s3
      .listObjectsV2({
        Bucket: bucketName,
      })
      .promise();

    console.log('Objects in bucket:', result.Contents);
  } catch (error) {
    console.error('Error fetching objects:', error);
  }
};
// Вызов функции
listObjects();