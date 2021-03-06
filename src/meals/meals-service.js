const xss = require('xss');
const mealsRouter = require('./meals-router');

const userFields = [
	'usr.id AS user:id',
	'usr.full_name AS user:full_name',
];

const mealFields = [
	'meals.id', 'meals.alldaycalories', 'meals.dateofmeal',
	'meals.breakfast_food', 'meals.breakfast_calories',
	'meals.lunch_food', 'meals.lunch_calories',
	'meals.dinner_food', 'meals.dinner_calories',
];

const MealsService = {
	getMealById(db, id) {
		return db('meals')
			.select('meals.id', 'meals.alldaycalories', 'meals.date_created', ...userFields)
			.where('meals.id', id).first()
			.leftJoin('caloriecounter_users AS usr', 'meals.userId', 'usr.id');
	},
	getMealsByUser(db, userid) {
		return db('meals')
			.select(...mealFields, ...userFields)
			.where({ userid })
			.leftJoin('caloriecounter_users AS usr', 'meals.userid', 'usr.id');
	},

	getAllMeals(db) {
		return db.select('*').from('meals');
	},

	getById(db, id) {
		return MealsService.getAllMeals(db).where('meal.id', id).first();
	},

	serializeMeals(meal) {
		return {
			id: meal.id,
			alldaycalories: xss(meal.alldaycalories),
			date_created: new Date(meal.date_created)
		};
	},

	insertMeals(db, newMeal) {
		return db.insert(newMeal).into('meals');
	},
	updateMeals(db, date, userid, meals) {
		return MealsService.getallMeals(db).where('dateofmeal', date).where('userid', userid).update(meals);
	},

	getMealById(db, id) {
		return db('meals')
			.select('meals.id', 'meals.alldaycalories', 'meals.date_created', ...userFields)
			.where('meals.id', id).first()
			.leftJoin('caloriecounter_users AS usr', 'meals.userId', 'usr.id');
	},

	getMealsByUser(db, userid) {
		return db('meals')
			.select(...mealFields, ...userFields)
			.where({ userid })
			.leftJoin('caloriecounter_users AS usr', 'meals.userid', 'usr.id');
	},
};

module.exports = MealsService;
