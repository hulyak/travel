var express = require('express');
var router = express.Router();
//require controllers
const hotelController = require("../controllers/hotelController");
const hotel = require('../models/hotel');
const {
  Router
} = require('express');

/* GET home page. */
router.get('/', hotelController.homePageFilters);

router.get("/all", hotelController.listAllHotels);
// hotel description page
router.get('/all/:hotel', hotelController.hotelDetail);
router.get("/countries", hotelController.listAllCountries);
// create country page for each country
router.get('/countries/:country', hotelController.hotelsByCountry);
//ADMIN Routes:
router.get('/admin', hotelController.adminPage);
router.get('/admin/add', hotelController.createHotelGet);
//form post route
router.post('/admin/add',
  //add multer middleware
  hotelController.upload,
  hotelController.createHotelPost);
// admin edit route with the function editRemoveGet
router.get('/admin/edit-remove', hotelController.editRemoveGet);
router.post('/admin/edit-remove', hotelController.editRemovePost);
// admin page update button
router.get('/admin/:hotelId/update', hotelController.updateHotelGet);
router.post('/admin/:hotelId/update ', hotelController.updateHotelPost);
// create delete route
router.get('/admin/:hotelId/delete', hotelController.deleteHotelGet);
router.post('/admin/:hotelId/delete', hotelController.deleteHotelPost);
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