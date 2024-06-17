import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const s3Client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.S3_ENDPOINT!,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

// Create a multer storage object using Multer S3
const storage = multerS3({
  s3: s3Client,
  bucket: (_, __, cb) => cb(null, process.env.S3_BUCKET_NAME!),
  acl: "public-read",
  metadata: function (_req, file, cb) {
    cb(null, { fieldName: file.fieldname, originalname: file.originalname });
  },
  key: function (_req, _file, cb) {
    // use uuid to generate a unique file name
    cb(null, uuidv4());
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

// Create a multer instance with the storage configuration
const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;
