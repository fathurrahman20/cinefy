import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { allowedFileTypes } from "./schema";

// export const thumbnailStorage = (path = "public/uploads/thumbnails") =>
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path);
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//       const filename = `${file.fieldname}-${uniqueSuffix}.${
//         file.mimetype.split("/")[1]
//       }`;
//       cb(null, filename);
//     },
//   });

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(null, false);
  }

  cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter: imageFilter });
