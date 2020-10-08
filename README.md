# Calorie Counter
* This app uses the PERN stack
## Live: 
https://calorie-counter-client.vercel.app

## Front-end repo:
https://github.com/gdreid13/calorie-counter-client

### For developers
Clone the source locally:

```sh
$ git clone https://github.com/gdreid13/calorie-counter-server.git
```

Install project dependencies:

```sh
$ npm install
```
***Setup .env files (For local use)***

***postgresql://postgres@localhost/caloriecounter***
* Run server

Start the app:

```sh
$ npm start
```

## Description
This endpoint provides information for Calorie Counter App.  Users can GET
and POST their meal information to track monthly calories.  AUTH login is required to POST and interact with full functionality.

## Technologies:
* React
* Node
* Express
* PostgreSQL

## Endpoints:
***/api/auth***
* GET auth token

***/api/users***
* POST user

***/api/meals***
* GET meals
* POST meals
* UPDATE meals


## App Features:
* Calorie tracking
* Meals tracking
* Healthy recipes
* Workouts

### For general visitors: 
* Healthy recipes and workouts can be accessed without an account

### For registered users:
* Post, edit meal for a specific date
* Get total calories for a specific month
* Data protection: bcrypt
* Username recovery/password reset

## Installed packages:
* react-router-dom, prop-types,enzyme
* react-test-renderer(-D)

## Landing page
![Landing page](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/dashboard.JPG)

## Registration
![Registration](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/register.JPG)

## Calendar
![Calendar](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/register.JPG)

## Meal entry
![Meal entry](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/mealentry.JPG)

## Recipe and fitness links
![Recipe and fitness links](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/recipefitness.JPG)

## Future developments
* Implement 1lb / week weight loss feature


## Developed by:

[Greg](https://github.com/gdreid13)
[Kidus](https://github.com/KidusY)
[Ty](https://github.com/tyonek)
[Duy](https://github.com/DuyLuu90)
