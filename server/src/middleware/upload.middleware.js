const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to the uploads directory
const uploadDir = path.join(process.cwd(), "uploads");

// Render will not have uploads/ because it is gitignored.
// Create it automatically when the server starts.
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
            new Error("Only JPG and PNG images are allowed"),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = upload;