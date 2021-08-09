const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (_req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
    }

});
const upload = multer({ storage });

module.exports = upload;
