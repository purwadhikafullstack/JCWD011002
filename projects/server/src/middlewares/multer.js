const multer = require("multer");
const fs = require("fs");

let defaultPath = "public/images";
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);
    if (!isDirectoryExist) {
      await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
        recursive: true,
      });
    }

    cb(null, `${defaultPath}/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      Math.round(Math.random() * 1000000000) +
      "." +
      file.mimetype.split("/")[1]
    );
  },
});

const maxSize = 1 * 1024 * 1024;
const fileSize = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Gambar terlalu besar. Maksimum 1MB diizinkan." });
    }
  }
  next(err);
}
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1];
  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("file format not match"));
  }
};

const handleFileSizeError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Gambar terlalu besar. Maksimum 1MB diizinkan." });
    }
  }
  next(err);
};

const multerUpload = (fieldName) => (req, res, next) => {
  multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
  }).single(fieldName)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "Gambar terlalu besar. Maksimum 1MB diizinkan." });
      }
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};


module.exports = {
  multerUpload,
  handleFileSizeError,
};