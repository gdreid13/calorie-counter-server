const { path, GeneralService } = require('../utils/route-helpers');
const { requireAuth } = require('../middleware/jwt-auth');
const express = require('express');
const MealsService = require('./meals-service');
const mealsRouter = express.Router();

const jsonBodyParser = express.json();

const { checkItemExists } = require('../middleware/general');

mealsRouter.route('/mealsbymonth/:id').get((req, res, next) => {
	const yearAndMonth = req.params.id;

	MealsService.getMealsByMonth(req.app.get('db'), yearAndMonth).then((meals) =>{
      console.log(meals);
    
    res.json(meals)});
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
		MealsService.getMealsbyDate(req.app.get('db'), newMeal.dateofmeal)
			.then((meals) => {
				console.log(meals);

				if (meals.length === 0) {
					MealsService.insertMeals(req.app.get('db'), newMeal).then((meal) => {
						res.status(201).json(meal);
					});
				} else {
					MealsService.updateMeals(req.app.get('db'), newMeal.dateofmeal, newMeal.userid, {
						alldaycalories: newMeal.alldaycalories
					}).then(res.json('updated'));
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
/*   .patch(jsonBodyParser,(req,res,next)=>{
      const {userId, alldaycalories}= req.body
      const mealToUpdate={userId,alldaycalories}
      return GeneralService.updateItem(req.app.get('db'),'meals',req.params.id,mealToUpdate)
        .then(()=>res.status(200).json('Success'))
        .catch(next)

  }) */
// commented this out because it won't work in its current state

/*
async function checkMealExists(req, res, next) {
  try {
    const meal = await MealsService.getById(
   

     
    MealsService.insertMeal(
      req.app.get('db'),
      req.params.meal_id
    )

    if (!meal)
      return res.status(404).json({
        error: `meal doesn't exist`
      .then(meal => {
        res
          .status(201)
          .json(MealsService.serializeMeals(meal))
      })

    res.product = product
    next()
  } catch (error) {
    next(error)
  }
}
*/
// Duy requested this to be commented out because it's handled in General Service

module.exports = mealsRouter;
