var express = require('express');
var router = express.Router();
//require controllers
const hotelController = require("../controllers/hotelController");
const hotel = require('../models/hotel');

/* GET home page. */
router.get('/', hotelController.homePage);

router.get("/all", hotelController.listAllHotels);
router.get("/countries" , hotelController.listAllCountries);

//ADMIN Routes:
router.get('/admin', hotelController.adminPage);
router.get('/admin/add', hotelController.createHotelGet);
//form post route
router.post('/admin/add', hotelController.createHotelPost);

// add 'next' by adding comma 
// router.get('/sign-up', hotelController.signUp , hotelController.login);
// router.get('/log-in', hotelController.login);
 //add route parameter for users
// router.get("/all/:name/:age", function(req,res){
//   const name = req.params.name;
//   res.render('all_hotels', {title : 'All Hotels' , name });
  // localhost:3000/all/adsds
  // /all/*/ = after any data
// });

module.exports = router;
