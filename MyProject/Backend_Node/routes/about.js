var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('about',
      {
         "id": 0,
         "name": "product_node",
         "price": 100,
         "img": "http://cdn.shopify.com/s/files/1/0075/3929/4305/collections/G22_WA_AP_NAV-Shoes.jpg?v=1645999375",
         "owner": "user1_node"
      }
   );
});

module.exports = router;

