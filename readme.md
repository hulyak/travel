https://repl.it/join/izmzgbpc-hulya95

# Travel App Built with Node/Express, MongoDB, Pug

* A user can login and make bookings for hotels in various countries. User can search for the number of nights, number of guests, as well as star rating and by the price low to high or high to low. 
* Home page shows random hotels from database, user can find extended view of every hotel's information with the current availability and current price.
* User can filter the hotels by countries. User can see their bookings. 
* If the user is admin, admin can add hotels, view bookings and remove them from database.

## Set Up

:heavy_check_mark: Node/NPM installed

:heavy_check_mark: Express generator `sudo npm install express-generator -g`

:heavy_check_mark: cd into the directory the project you want to be in eg. `cd desktop`

:heavy_check_mark: create a new project `express travel --view=pug`

:heavy_check_mark: start the app `npm start`

:heavy_check_mark: navigate to `localhost:3000`, inside the bin/www folder port is default to 3000.

:heavy_check_mark: `npm install --save-dev nodemon` start the app for development use `npm run devstart`

:heavy_check_mark: Sign up for mongoDB-Atlas and create a free cluster. Go to Database Access -> Add new user -> Database User privileges -> Atlas admin along with email and password.

:heavy_check_mark: Network access -> IP Whitelist -> Add IP address -> Add Current IP address. Add computer's IP address to Mongo's IP whitelist.

:heavy_check_mark: Access database information. Clusters -> Collections

:heavy_check_mark: Overview -> Connect -> Connect your application -> Connection string Only.

:heavy_check_mark: Create a **Cloudinary** account to store the images in the cloud. 

:heavy_check_mark: Install cloudinary `npm i cloudinary`.

:heavy_check_mark: To use cloudinary, include `enctype = 'multipart/form-data` inside *_hotel_form.pug* file .We can get image files when we make POST requests.

:heavy_check_mark: To handle multipart/form-data, require multer express middleware. 
`npm i multer`. Multer allows us to store images into memory. Then, we can push the images into Cloudinary. 



### File Structure

* Bin folder stores startup scripts, sets up http server to serve up the project.

* Public folder contains static files.(images/stylesheets/javascript for frontend)
 
* Routes folder contains js files to handle urls. 

* Views folder contains templating engine/pug.(User interface)Layout.pug is the main pug template. Mixins are to reduce repetition.

* App.js is the app starting point, main page that connects everything together.
  
* MVC Pattern: Model-View-Controllers. Controllers folder generates the Express routes.

* Models folder includes mongoose models. Good for saving data before sending off to the database.
  

