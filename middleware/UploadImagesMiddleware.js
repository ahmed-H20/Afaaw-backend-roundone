const multer = require("multer");

const uploadOptions = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/products");
    },
    filename: function (req, file, cb) {
      // productName-id.extantion

      const extention = file.mimetype.split("/")[1];
      const fileName = `product-${uuidv4()}-${Date.now()}.${extention}`;
      cb(null, fileName);
    },
  });

  return multer({ storage: storage });
};

const uploadSingleImage = (fieldName) => {
  const upload = uploadOptions().single(fieldName);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: "Error uploading file" });
    }
  });
};

module.exports = { uploadSingleImage };
