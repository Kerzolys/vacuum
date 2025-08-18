import { v4 as uuidv4 } from "uuid";
import {
  TRegistrationStringQuartetValues,
  TStringQuartetApplication,
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
    Key: `lab/string_quartets/${id}/${file.name}`,
    Body: new Uint8Array(arrayBuffer),
    ContentType: file.type,
    ChecksumAlgorithm: undefined,
    ACL: ObjectCannedACL.public_read,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    return `https://storage.yandexcloud.net/${process.env.REACT_APP_YANDEX_BUCKET_NAME}/lab/string_quartets/${id}/${file.name}`;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export const preparingStringQuartetData = async (
  values: TRegistrationStringQuartetValues
) => {
  try {
    if (!values.bio || !values.motivation_letter || !values.photo_file) return;

    const bioLink = await uploadToYandex(values.bio);
    const motivationLetterLink = await uploadToYandex(values.motivation_letter);
    const photoLink = await uploadToYandex(values.photo_file);

    const stringQuartetApplicationData: TStringQuartetApplication = {
      id,
      quartet_name: values.quartet_name,
      bio: bioLink,
      photo_url: photoLink,
      members: {
        first_violin_name: values.members.first_violin_name,
        second_violin_name: values.members.second_violin_name,
        viola_name: values.members.viola_name,
        cello_name: values.members.cello_name,
      },
      media_materials: values.media_materials,
      source_of_discovery: values.source_of_discovery,
      motivation_letter: motivationLetterLink,
      email: values.email,
      seen: false,
      createdAt: serverTimestamp(),
    };

    const docRef = doc(db, "labStringQuartets", id);
    await setDoc(docRef, stringQuartetApplicationData);

    return stringQuartetApplicationData;
  } catch (err) {
    console.error("Error uploading application:", err);
    throw err;
  }
};
