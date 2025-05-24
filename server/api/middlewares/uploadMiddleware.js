
import multer from 'multer';


const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})


const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB)
        files: 4
    },
    fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|webp|png|avif/;
        const extname = allowedTypes.test(file.mimetype);
        const mimetype = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());

        if (extname && mimetype) {
            return callback(null, true);
        } else {
            callback(new Error('Only JPEG, avif, PNG, and WEBP files allowed!'));
        }
    }
});


export default upload.array('images');  // Allow multiple files