var { addDoc, query, orderBY, getDocs } = require("firebase/firestore");
var { products_col, users_col } = require('../firebasefunctions/firebase')
var { getStorage, ref, uploadString, listAll, getDownloadURL } = require('firebase/storage');

var express = require('express');
var router = express.Router();

// import from public folder
router.use(express.static('public'));


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
 
    const storage = getStorage();
    var docs_data = [];

    // Get all documents in the "products" collection
    const querySnapshot = await getDocs(users_col);

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

router.get('/id', async function (req, res, next) {
  const userId = req.params.id;

  const user = await getDoc(doc(userId, productId));
  console.log(user.data())
  res.json(user.data());

});

router.get('/test', function (req, res, next) {

  const imagePaths = ['dog.jpg', 'cat.jpg']
  // const options =  {root: Path.join(__dirname, '../public/images')}
  // console.log(path.join(__dirname))
  
  res.sendFile('cat.jpg', { root: 'public/images' });

  
});

module.exports = router;
