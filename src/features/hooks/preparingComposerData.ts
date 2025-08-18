import { v4 as uuidv4 } from "uuid";
import {
  TComposerApplication,
  TRegistrationComposerValues,
} from "../../utils/types";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../../services/yandexCloud/yc";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";

const id = uuidv4();

const uploadToYandex = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();

  const params = {
    Bucket: process.env.REACT_APP_YANDEX_BUCKET_NAME!,
    Key: `lab/composers/${id}/${file.name}`,
    Body: new Uint8Array(arrayBuffer),
    ContentType: file.type,
    ChecksumAlgorithm: undefined,
    ACL: ObjectCannedACL.public_read,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    return `https://storage.yandexcloud.net/${process.env.REACT_APP_YANDEX_BUCKET_NAME}/lab/composers/${id}/${file.name}`;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export const preparingComposerData = async (
  values: TRegistrationComposerValues
) => {
  try {
    if (!values.bio || !values.motivation_letter || !values.photo_file) return;

    const bioLink = await uploadToYandex(values.bio);
    const motivationLetterLink = await uploadToYandex(values.motivation_letter);
    const photoLink = await uploadToYandex(values.photo_file);

    const composerApplicationData: TComposerApplication = {
      id,
      composer_name: values.composer_name,
      bio: bioLink,
      photo_url: photoLink,
      experience: values.experience,
      media_materials: values.media_materials,
      source_of_discovery: values.source_of_discovery,
      motivation_letter: motivationLetterLink,
      email: values.email,
      seen: false,
      createdAt: serverTimestamp(),
    };

    const docRef = doc(db, "labComposers", id);
    await setDoc(docRef, composerApplicationData);

    return composerApplicationData;
  } catch (err) {
    console.error("Error uploading application:", err);
    throw err;
  }
};
