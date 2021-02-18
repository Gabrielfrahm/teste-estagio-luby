import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 'disk';

  tempFolder: string;

  uploadFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
