const { path, GeneralService } = require('../utils/route-helpers');
const { requireAuth } = require('../middleware/jwt-auth');
const express = require('express');
const MealsService = require('./meals-service');
const mealsRouter = express.Router();

const jsonBodyParser = express.json();

const { checkItemExists } = require('../middleware/general');

mealsRouter.route('/mealsbymonth/:id').get((req, res, next) => {
	const yearAndMonth = req.params.id;

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
