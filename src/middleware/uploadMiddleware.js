const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (folderName, prefix) => {
    const uploadDir = path.join(__dirname, `../../uploads/${folderName}`);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    });
};

const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) return cb(null, true);
    cb(new Error('Apenas imagens (jpg, jpeg, png, webp) são permitidas!'));
};

const upload = {
    user: multer({
        storage: createStorage('profile-pics', 'profile'),
        fileFilter: imageFilter,
        limits: { fileSize: 2 * 1024 * 1024 }
    }),
    table: multer({
        storage: createStorage('table-pic', 'table'),
        fileFilter: imageFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
    })
};

module.exports = upload;