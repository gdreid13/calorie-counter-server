# calorie-counter-server

This endpoint provides information for Calorie Counter App.  Users can GET
and POST their meal information.  AUTH login is required.

## Live: 
https://calorie-counter-client.vercel.app

## Front-end repo:
https://github.com/gdreid13/calorie-counter-client

## Built with:
* React
* Node
* Express
* PostgreSQL

## To set up:
yarn OR npm i / npm install
createdb calorie-counter-server
npm run migrate

## Endpoints:
/api/auth
* GET auth token

/api/users
* POST user

/api/meals
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