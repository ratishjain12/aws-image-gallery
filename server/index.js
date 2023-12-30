const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { uploadToS3, getURL } = require("./s3");
const dotenv = require("dotenv");
const dbconnect = require("./connect");
const IMG = require("./models/images");
const PORT = process.env.PORT || 8000;

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

dbconnect()
  .then(() => console.log("Connected!!"))
  .catch((err) => console.log(err));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async function (req, res) {
  const { file } = req;
  const { userid } = req.body;

  if (!file) return res.status(400).json({ message: "Bad Request" });
  const { error, keyCode } = await uploadToS3(file, userid);
  if (error) return res.status(500).json({ message: error.message });

  if (!keyCode) {
    return res.status(500).json({ message: "No key" });
  }

  const url = `https://image-storage-project.s3.ap-south-1.amazonaws.com/${keyCode}`;

  await IMG.create({
    url: url,
    userid: userid,
  });

  return res.status(200).json({ keyCode });
});

app.get("/", async (req, res) => {
  const data = await IMG.find({});
  res.json({ data });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
