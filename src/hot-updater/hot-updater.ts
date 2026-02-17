import { s3Database, s3Storage } from "@hot-updater/aws";
import { createHotUpdater } from "@hot-updater/server";

const region = process.env.S3_REGION!;
const accessKeyId = process.env.S3_ACCESS_KEY_ID!;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
const bucketName = process.env.S3_BUCKET_NAME!;
const endpoint = process.env.S3_ENDPOINT
const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";

const getConfig = ()=>{
  return {
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        bucketName,
        endpoint,
        forcePathStyle, 
  }
}

const getDatabase = ()=>{
    return s3Database(getConfig())
}

const getS3Storage = ()=>{
    return s3Storage(getConfig())
}

export const hotUpdater = createHotUpdater({
  database: getDatabase(),
  storages: [
    getS3Storage()
  ],
  basePath: "/hot-updater",
});

