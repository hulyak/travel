const Hotel = require('../models/hotel');
const {
  NotExtended
} = require('http-errors');
const hotel = require('../models/hotel');
//separate logic
// exports.homePage = (req,res) => {
//   res.render('index', { title: 'Lets travel' });
// }

//return all the data from databse with find
exports.listAllHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find({
      available: {
        $eq: true
      }
    }); //eq equality mongo, only query available hotels
    res.render('all_hotels', {
      title: 'All Hotels',
      allHotels
    }); //allHotels is a variable to use inside pug file
    // res.json(allHotels);
  } catch (error) {
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
    res.render('all_countries', {
      title: 'Browse by country',
      allCountries
    }); //render all_countries.pug
  } catch (error) {
    next(error);
  }
};

// aggregation pipeline to filter home page
exports.homePageFilters = async (req, res, next) => {
  try {
    const hotels = await Hotel.aggregate([{
        $match: {
          available: true
        }
      }, //available ones only
      {
        $sample: {
          size: 9
        }
      } //only return 9 hotels randomly
    ]);
    const countries = await Hotel.aggregate([{
        $group: {
          _id: '$country'
        }
      }, //only return each country once
      {
        $sample: {
          size: 9
        }
      }
    ]);
    res.render('index', {
      countries,
      hotels
    })
    // res.json(countries);
  } catch (error) {
    next(error);
  }
};



//renders admin object 
exports.adminPage = (req, res) => {
  res.render('admin', {
    title: 'Admin'
  });
};

exports.createHotelGet = (req, res) => {
  res.render('add_hotel', {
    title: 'Add new hotel'
  });
};

// hotel is saved as a collection in mongodb 
exports.createHotelPost = async (req, res, next) => {
  // output the data as json
  // use this data to push to the database
  // res.json(req.body);
  try {
    const hotel = new Hotel(req.body);
    await hotel.save(); //save to database
    res.redirect(`/all/${hotel._id}`); //after adding a new hotel redirect to hotel id 
  } catch (error) {
    next(error);
  }
}

// edit_remove page will be rendered
exports.editRemoveGet = (req, res) => {
  res.render('edit_remove', {
    title: 'Search for hotel to edit or remove'
  });
}

exports.editRemovePost = async (req, res, next) => {
  try {
    const hotelId = req.body.hotel_id || null;
    const hotelName = req.body.hotel_name || null;

    // search from database
    const hotelData = await Hotel.find({
      $or: [{
          _id: hotelId
        },
        {
          hotel_name: hotelName
        }
      ]
    }).collation({
      locale: 'en', //langauge specific
      strength: 2 //not case sensitive
    });

    if (hotelData.length > 0) {
      // shows hotel info as json
      // res.json(hotelData);
      res.render('hotel_detail', {
        title: 'Add / Remove Hotel',
        hotelData
      })
      return;
    } else {
      res.redirect('/admin/edit-remove');
    }

  } catch (error) {
    next(error);
  }
}

// admin update hotels get route
exports.updateHotelGet = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.hotelId
    });
    // res.json(hotel);
    // render page  add_hotel template to show for the update route
    res.render('add_hotel', {
      title: 'Update hotel',
      hotel
    })
  } catch (error) {
    next(error);
  }
}

// post route for updating hotels
exports.updateHotelPost = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findByIdAndUpdate(hotelId, req.body, {
      new: true //gives modified version
    });
    res.redirect('/all/${hotelId}')
  } catch (error) {
    next(error)
  }
}

exports.deleteHotelGet = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findOne({
      _id: hotelId
    })
    res.render('add_hotel', {
      title: 'Delete hotel',
      hotel
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteHotelPost = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findByIdAndRemove({
      _id: hotelId
    })
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

exports.hotelDetail = async (req, res, next) => {
  try {
    const hotelParam = req.params.hotel;
    const hotelData = await Hotel.find({
      _id: hotelParam
    });
    res.render('hotel_detail', { //render hotel detail template
      title: 'Lets Travel',
      hotelData
    })
  } catch (error) {
    next(error)
  }
}