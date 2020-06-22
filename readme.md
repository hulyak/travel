# Travel App Built with Node/Express, MongoDB, Pug

## Set Up

:heavy_check_mark: Node/NPM installed

<<<<<<< HEAD
:heavy_check_mark: Express generator 

`sudo npm install express-generator -g`
=======
:heavy_check_mark: Express generator `sudo npm install express-generator -g`
>>>>>>> 24816547bf2755b9c19c2d3fc4f2ebe86eaa8c63

:heavy_check_mark: cd into the directory the project you want to be in eg. `cd desktop`

:heavy_check_mark: create a new project `express travel --view=pug`

:heavy_check_mark: start the app `npm start`

:heavy_check_mark: navigate to `localhost:3000`, inside the bin/www folder port is default to 3000.

:heavy_check_mark: `npm install --save-dev nodemon` start the app for development use `npm run devstart`

:heavy_check_mark: Sign up for mongoDB-Atlas and create a free cluster. Go to Database Access -> Add new user -> Database User privileges -> Atlas admin along with email and password.

:heavy_check_mark: Network access -> IP Whitelist -> Add IP address -> Add Current IP address. Add computer's IP address to Mongo's IP whitelist.

:heavy_check_mark: Access database information. Clusters -> Collections

:heavy_check_mark: Overview -> Connect -> Connect you application -> Connection string Only.




### File Structure

* Bin folder stores startup scripts, sets up http server to serve up the project.

* Public folder contains static files.(images/stylesheets/javascript for frontend)
 
* Routes folder contains js files to handle urls. 

* View folder contains templating engine/pug.(User interface)Layout.pug is the main pug template. Mixins are to reduce repetition.

* App.js is the app starting point, main page that connects everything together.
  
* MVC Pattern: Model-View-Controllers. Controllers folder generates the Express routes.
 