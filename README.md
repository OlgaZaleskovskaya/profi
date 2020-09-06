# Profi

Project developed in version 9.1.2. with  SCSS and Angular Material.
NgRX is used for state control

Start Angular project by command:
ng serve

Check the result on localhost:4200

Project contains back-end part developed using NodeJS v.14.0.0, Nodemon and Express.

Install Express and Nodemon using commands:
npm install --save express
npm install --save-dev nodemon

Install bcrypt for authirusation to hash password
npm install bcrypt

jsonwebtoken is used for token generation
npm install jsonwebtoken

In order to use nodemon add the "start:server": "nodemon server.js" to the package.json file:
   "scripts": {
    //...,
    "start:server": "nodemon server.js"
  },

Pay attention that NodeJS uses port 3000 for server.

Start back-end part by command:
npm run start:server

Sharp and Image-Size are  used for for handling images uploading and downloading
npm install sharp
npm install image-size --save

Multer is used for handling multipart/form-data
npm install --save multer




