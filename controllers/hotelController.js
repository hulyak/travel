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