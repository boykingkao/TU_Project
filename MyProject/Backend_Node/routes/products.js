var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


var data = require('../public/data/products_data.js');
// var mongoose = require('mongoose');
// var Product = require('../models/products')
var { addDoc, query, orderBY, getDocs } = require("firebase/firestore");
var { products_col, wow } = require('../firebasefunctions/firebase')
var { getStorage, ref, uploadString, listAll, getDownloadURL } = require('firebase/storage');



function uploadImageToFirebase(image, newfileName) {
  console.log("uploadImageToFirebase")
  const imageString = image
  const storage = getStorage();
  const storageRef = ref(storage, 'products/' + newfileName);
  uploadString(storageRef, imageString, 'data_url').then((snapshot) => {
    console.log('Uploaded a data_url string!');
  });
}


// /product
router.get('/', async function (req, res, next) {
  try {
    // find data from mongodb
    

    const storage = getStorage();
    var docs_data = [];

    // Get all documents in the "products" collection
    const querySnapshot = await getDocs(products_col);

    // Loop through each document in the collection
    for (const doc of querySnapshot.docs) {
      let data = doc.data();
      data["imageURL"] = null
      data["ObjectId"] = doc.id;
      docs_data.push(data);
    }

    console.log(docs_data);
    res.json(docs_data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:id', function (req, res, next) { 
  console.log("you called choose product api")
  console.log("detail api")
  console.log(`object id is : ${req.params.id}`)
 
  res.send(req.params.id)

})


router.get('/test', function (req, res, next) {
  res.send('response product images done');
});


// /product/get
router.get('/getDoc', async function (req, res, next) {
  console.log("you called get product api")
  // let products = await Product.find();
  // console.log(products)
  // res.json(products);
});

router.post('/detail', function (req, res, next) {

  //get data from request
  var product = req.body;
  console.log("you called choose product api")
  console.log(product.name)
  console.log("detail api")
});




router.post('/addTest', function (req, res, next) {

  console.log(req.body)
  res.json({ status: "success" });

  uploadImageToFirebase(req.body.Productimage)



});

// /product/add
router.post('/add', async function (req, res, next) {
  var productData = req.body.productData;

  const timestamp = new Date().getTime();
  const sliceName = productData.imageName.slice(productData.imageName.lastIndexOf("."))
  const newfileName = timestamp + sliceName

  productData.imageName = newfileName


  const docRef = await addDoc(products_col, productData)
  uploadImageToFirebase(req.body.imageFile, newfileName)

  console.log("you called add product api")

  res.json({ status: "success" });

});



module.exports = router;


