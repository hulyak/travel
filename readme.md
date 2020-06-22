# Travel App Built with Node/Express, MongoDB, Pug

## Set Up

:heavy_check_mark: Node/NPM installed
:heavy_check_mark: Express generator `sudo npm install express-generator -g`
:heavy_check_mark: cd into the directory the project you want to be in eg. `cd desktop`
:heavy_check_mark: create a new project `express travel --view=pug`
:heavy_check_mark: start the app `npm start`
:heavy_check_mark: navigate to `localhost:3000`, inside the bin/www folder port is default to 3000.


### File Structure

* Bin folder stores startup scripts, sets up http server to serve up the project.

* Public folder contains static files.(images/stylesheets/javascript for frontend)
 
* Routes folder contains js files to handle urls. 

* View folder contains templating engine/pug.(User interface)

* App.js is the app starting point, main page that connects everything together.
