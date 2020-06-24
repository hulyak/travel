const Hotel = require('../models/hotel');
const { NotExtended } = require('http-errors');
//separate logic
exports.homePage = (req,res) => {
  res.render('index', { title: 'Lets travel' });
}

exports.listAllHotels = (req, res) => {
  res.render('all_hotels', {title : 'All Hotels'});
}

// after signup -> next show login
// exports.signUp = (req, res, next) => {
 //validate user info
//   console.log('Sign up middleware');
//   next();
// }

// exports.login = (req, res) => {
  //login
//   console.log('login middleware');
// }

//renders admin object 
exports.adminPage = (req, res) => {
  res.render('admin', {title : 'Admin'});
}
exports.createHotelGet = (req, res) => {
  res.render('add_hotel', {title :'Add new hotel'});
}

// hotel is saved as a collection in mongodb 
exports.createHotelPost = async (req, res, next) => {
  // output the data as json
  // use this data to push to the database
  // res.json(req.body);
  try {
    const hotel = new Hotel(req.body);
    await hotel.save(); //save to database
    res.redirect(`/all/${hotel._id}`);  //after adding a new hotel redirect to hotel id 
  }catch(error) {
    next(error);
  }
}