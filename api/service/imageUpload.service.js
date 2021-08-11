import multer from 'multer';

const destination = (_req, _file, cb) => {
  cb(null, 'public/uploads/');
};

const filename = (_req, file, cb) => {
  cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
};

const storage = multer.diskStorage( destination, filename );
const upload = multer({ storage });

export const uploadImg = upload;
