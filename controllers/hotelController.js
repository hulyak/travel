const Hotel = require('../models/hotel');
const { NotExtended } = require('http-errors');
//separate logic
exports.homePage = (req,res) => {
  res.render('index', { title: 'Lets travel' });
}

//return all the data from databse with find
exports.listAllHotels = async (req, res, next) => {
  try{   
    const allHotels = await Hotel.find({available:{$eq: true}}); //eq equality mongo, only query available hotels
    res.render('all_hotels', {title : 'All Hotels', allHotels}); //allHotels is a variable to use inside pug file
    // res.json(allHotels);
  }catch(error){
    next(errors);
  }
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

exports.listAllCountries = async (req, res, next) => {
  try {
    const allCountries = await Hotel.distinct('country'); //return distinct countries
    res.render('all_countries', {title : 'Browse by country' , allCountries}); //render all_countries.pug
  }catch(error){
    next(error);
  }
};

//renders admin object 
exports.adminPage = (req, res) => {
  res.render('admin', {title : 'Admin'});
};

exports.createHotelGet = (req, res) => {
  res.render('add_hotel', {title :'Add new hotel'});
};

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