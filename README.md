# E-commerce-Server

## Description
This application sets up a back-end server for the provided E-Commerce starter code, which also includes a file for dummy seed data which can be run from the command line to generate the database and seed it with data.

This application allows you to perform all possible CRUD operations to the database using `Insomnia`, as well as having easy and dynamic access to the database. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation
To install this applicaiton, follow the below instructions:

1. Hit 'code' from this repository and either clone the SSH or HTTP key
2. Navigate to the appropriate folder on your terminal
3. In your terminal, type `git clone` followed by the SSH or HTTP key from above
4. Use the command `code .` to open VS code with the downloaded files

## Usage
To use this applicaiton (after following installation instructions above), follow the below instructions:

1. Right-click on the `server.js` file and select `open integrated terminal`, then drag the terminal to the top of the screen
2. Ensure you have the right node modules installed by entering `npm install` in the VS Code Terminal
3. Ensure that you initialize your SQL database and seed by right-clicking on the `schema.sql` file within the `db` folder, and clicking `open integrated terminal`
4. Run the command `mysql -u root -p` to initialize mysql and enter your credentials
5. Run the command `source schema.sql` to create the database
6. In your terminal, ensure you are in the root directory (or simply right click on the `server.js` file again and click `open integrated terminal`) then run the command `npm run seed` to seed the database with data 
7. Enter the command `npm start` to run the program
8. Open `Insomnia` and you can use all CRUD operations based on the routes defined in the `routes` folder

Alternatively, see a walkthrough below: <br>
<a href="https://drive.google.com/file/d/18QRLMwSGbKA74xYhOJZ27tugKyuLw1pY/view" target="_blank" rel="noopener noreferrer">Walkthrough Video</a>

## Credits
N/A

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions

Email: brendan.mcginty14@gmail.com
Github: mcgintyb14

