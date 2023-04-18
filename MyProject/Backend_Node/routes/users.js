var express = require('express');
var router = express.Router();

// import from public folder
router.use(express.static('public'));


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function (req, res, next) {

  const imagePaths = ['dog.jpg', 'cat.jpg']
  // const options =  {root: Path.join(__dirname, '../public/images')}
  // console.log(path.join(__dirname))
  
  res.sendFile('cat.jpg', { root: 'public/images' });

  
});

module.exports = router;
