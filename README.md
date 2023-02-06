# Inventory App

This is a simple application created to manage your grocery store's inventory.

## Table of Contents
+ [General Information](#general-information)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Demo](#demo)
+ [Features](#features)

## General Information
This project is an inventory management app for an imaginary grocery store. This Inventory app have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. Anybody visiting
the site can perform CRUD operations on any item or category.

## Technologies
+ node: 16.17.1
+ express: ~4.16.1
+ ejs: ~2.6.1
+ mongoose: ^6.7.5

## Setup 
To run this project locally

```
# clone this repository
git clone https://github.com/Tanishka-2000/inventory-application

# Go into the repository
cd inventory-application

# install dependencies
npm install

```
Add environment variable
+ Create .env file in the root directory
+ Create variable named 'MONGODB_URI' and set it equal to your mongodb database url (either local database or cloud database)

```
# start application
npm start

# start application with nodemon
npm run dev

```

## Demo
Link to the live demo [https://inventory-fgyk.onrender.com](https://inventory-fgyk.onrender.com)

## Features
+ Home page displays a list of all categories available.
+ Click on any category's view button takes you to a details page for that category.
+ Category's details page provide you with information about that category and options to update or delete that category.
+ Category's details page also displays a list of food items under that category.
+ Click on any food Item's view button takes you to a details page for that food Item.
+ Food Item's details page shows you info like stock and price of that food Item.
+ Food Item's details page also allows you update or delete that food Item.
+ Navbar provide links to create new food category or food item.