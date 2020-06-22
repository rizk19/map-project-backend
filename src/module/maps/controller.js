const router = require("express").Router();
const { getData } = require("./repository");
var path = require('path');
var multer  = require('multer')
const uploadPath = path.resolve(__dirname, "../core/database/collection")
// const { sqlite3 } = require("../../core/database");
// const { logger } = require('../../core/logger');
var upload = multer({ dest: uploadPath })

router.get("/", async (req, res) => {
  const data = await getData();
  if (data.status === 'SUCCESS') {
      res.status(200).send(data)
  } else {
    res.status(400).send(data)
  }
});

// router.get("/all", async (req, res) => {
//   const data = await getDataAll();
//   if (data.status === 'SUCCESS') {
//     console.log('START ALL');
    
//       res.status(200).send(data)
//   } else {
//     res.status(400).send(data)
//   }
// });

router.post("/", upload.single("uploadedDb"), (req, res) => {
  // const data = search(req.body);
  console.log(req.file);
  
  return res.json(req.body);
});

// router.post("/path", async (req, res) => {

//   let dbUSB = new sqlite3.Database(req.body.path, (err) => {
//     if (err) {
//       return logger.error(err.message);
//     }
//     logger.info('Connected to the USB SQlite database.');
//   });
//   const data = await getLengths(dbUSB);
//   console.log('data',data);
  
  
//   res.json(req.body);
// });

router.post('/upload' ,async (req, res) => {
  const length = await getLength()
  s.sandDataToMap(length)
  return res.json('prosesing')
})

module.exports = router;