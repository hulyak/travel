const Hotel = require('../models/hotel');
const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// store images into a file or directory; but we will save it to Cloudinary 
const storage = multer.diskStorage({});

const upload = multer({
  storage
});

exports.upload = upload.single('image'); //upload single image

exports.pushToCloudinary = (req, res, next) => {
  if (req.file) { //if file exists, admin can edit the description only
    cloudinary.uploader.upload(req.file.path)
      .then((result) => {
        req.body.image = result.public_id;
        next();
      })
      .catch(() => {
        res.redirect('/admin/add');
      });
  } else {
    next(); //passes to next middleware , createHotelPost
  }
};

const {
  NotExtended
} = require('http-errors');

// const hotel = require('.s./models/hotel');
//separate logic
// exports.homePage = (req,res) => {
//   res.render('index', { title: 'Lets travel' });
// }

//return all the data from databse with find
exports.listAllHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find({
      // available: {
      //   $eq: true
      // }
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
    const hotels = Hotel.aggregate([{
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
    const countries = Hotel.aggregate([{
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
    //wait multiple promises
    const [filteredCountries, filteredHotels] = await Promise.all([countries, hotels]);
    res.render('index', {
      filteredCountries,
      filteredHotels
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


exports.hotelsByCountry = async (req, res, next) => {
  try {
    const countryParam = req.params.country;
    const countryList = await Hotel.find({
      country: countryParam
    });
    // res.json(countryList);
    res.render('hotels_by_country', {
      title: `Browse by country: ${countryParam}`,
      countryList
    });
  } catch (error) {
    next(error)
  }
}

// comes from layout.pug form
exports.searchResults = async (req, res) => {
  const searchQuery = req.body; //all the information inside the form 
  const parsedStars = parseInt(searchQuery.stars) || 1
  const parsedSort = parseInt(searchQuery.sort) || 1
  // aggregation pipeline filter data
  //stages of agg. pipeline - text search - match any records to the text entered by the user
  const searchData = await Hotel.aggregate([{
      $match: {
        $text: {
          $search: `\"${searchQuery.destination}\"`
        }
      }
    },
    {
      $match: {
        available: true,
        star_rating: {
          $gte: parsedStars
        }
      }
    },
    {
      $sort: {
        cost_per_night: parsedSort
      }
    }
  ]);
  res.render('search_results', {
    title: "Search results",
    searchQuery,
    searchData
  });
}