const { path, GeneralService } = require('../utils/route-helpers');
const { requireAuth } = require('../middleware/jwt-auth');
const express = require('express');
const MealsService = require('./meals-service');
const mealsRouter = express.Router();

const jsonBodyParser = express.json();

const { checkItemExists } = require('../middleware/general');

mealsRouter.route('/mealsbymonth/:id').get((req, res, next) => {
	const yearAndMonth = req.params.id;

  })
  .post(jsonBodyParser, (req, res, next) => {
    const {userid, dateofmeal,breakfast_food,breakfast_calories,lunch_food,lunch_calories,dinner_food,dinner_calories,alldaycalories} = req.body

    const newMeal= {userid, dateofmeal,breakfast_food,breakfast_calories,lunch_food,lunch_calories,dinner_food,dinner_calories,alldaycalories}
  /*   
    for (const [key, value] of Object.entries(newMeal))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
      }) 
  */

    // commented out validation above because breakfast/lunch/dinner are not required, can change this later

    const sanitizedMeal= sanitizeItem(newMeal)
    
    GeneralService.insertItem(req.app.get('db'),'meals',sanitizedMeal)
      .then(meal=>{
        res.status(201)
        .location(path.posix.join(req.originalUrl,`/${meal.id}`))
        .json(meal)
      })
      .catch(next) 

    // trying to isolate issue, trying with simpler code below
    /*
    MealsService.insertMeals( req.app.get('db'),newMeal)
      .then(meal => res.status(201).json(meal))
      .catch(next)
    */
  })
  

mealsRouter.route('/:id')
  .all((req,res,next)=>checkItemExists(req,res,next,'meals'))
  .get((req, res, next) => {
    // res.json(res.item)
    MealsService.getMealById(req.app.get('db'),req.params.id)
      .then((meal)=>res.status(200).json(meal)).catch(next)
  })
  .delete((req,res,next)=>{
      GeneralService.deleteItem(req.app.get('db'),'meals',req.params.id)
        .then(()=>res.status(200).json('Meal has been deleted'))
  })
  .patch(jsonBodyParser,(req,res,next)=>{
      const {alldaycalories,breakfast_calories,breakfast_food,lunch_food,lunch_calories,dinner_food,dinner_calories}= req.body
      const mealToUpdate={alldaycalories,breakfast_calories,breakfast_food,lunch_food,lunch_calories,dinner_food,dinner_calories}
      return GeneralService.updateItem(req.app.get('db'),'meals',req.params.id,mealToUpdate)
        .then(()=>res.status(200).json('Success'))
        .catch(next)

  })


async function checkMealExists(req, res, next) {
  try {
    const meal = await MealsService.getById(
    MealsService.insertMeal(
      req.app.get('db'),
      req.params.meal_id
    )
	MealsService.getMealsByMonth(req.app.get('db'), yearAndMonth).then((meals) => {
		res.json(meals);
	});
});

mealsRouter
	.route('/')
	.get((req, res, next) => {
		MealsService.getAllMeals(req.app.get('db'))
			.then((meals) => {
				res.status(200).json(meals);
			})
			.catch(next);
	})
	.post(jsonBodyParser, (req, res, next) => {
		const newMeal = req.body;
		if (newMeal.alldaycalories == null) {
			newMeal.alldaycalories = 0;
		}
		MealsService.getMealsbyDate(req.app.get('db'), newMeal.dateofmeal)
			.then((meals) => {
				if (meals.length === 0) {
					MealsService.insertMeals(req.app.get('db'), newMeal).then((meal) => {
						res.status(201).json(meal);
					});
				} else {
					const newAlldayCalories =
						Number(meals[0].lunch_calories) +
						Number(meals[0].dinner_calories) +
						Number(meals[0].breakfast_calories);
					newMeal.alldaycalories = newAlldayCalories;
					MealsService.updateMeals(req.app.get('db'), newMeal.dateofmeal, newMeal.userid, newMeal).then(
						res.json('updated')
					);
				}
			})
			.catch(next);
	});


mealsRouter
	.route('/:id')
	.all((req, res, next) => checkItemExists(req, res, next, 'meals'))
	.get((req, res, next) => {
		MealsService.getMealById(req.app.get('db'), req.params.id)
			.then((meal) => res.status(200).json(meal))
			.catch(next);
	})
	.delete((req, res, next) => {
		GeneralService.deleteItem(req.app.get('db'), 'meals', req.params.id).then(() =>
			res.status(200).json('Meal has been deleted')
		);
	});

module.exports = mealsRouter;
