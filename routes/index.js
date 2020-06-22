var express = require('express');
var router = express.Router();
//require controllers
const hotelController = require("../controllers/hotelController");
/* GET home page. */
router.get('/', hotelController.homePage);

router.get("/all", function(req,res){
  res.render('all_hotels', {title : 'All Hotels'});
});

 //add route parameter for users
// router.get("/all/:name/:age", function(req,res){
//   const name = req.params.name;
//   res.render('all_hotels', {title : 'All Hotels' , name });
  // localhost:3000/all/adsds
  // /all/*/ = after any data
// });

module.exports = router;
