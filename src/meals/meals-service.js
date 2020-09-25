const xss = require('xss');
const mealsRouter = require('./meals-router');

const userFields = [
	'usr.id AS user:id',
	'usr.full_name AS user:full_name',
	'usr.age AS user:age',
	'usr.gender AS user:gender',
	'usr.height AS user:height',
	'usr.weight AS user:weight'
];

const MealsService = {
	getallMeals(db) {
		return db.select('*').from('meals');
	},
	getMealsByMonth(db,yearAndMonth){
		return this.getAllMeals(db).where('dateofmeal','like',`${yearAndMonth}%`)
	},
	getMealsbyDate(db,date){
		console.log(date)
		return db.select('*').from('meals').where('dateofmeal',date);
	},
	getMealById(db, id) {
		return db('meals')
			.select('meals.id', 'meals.alldaycalories', 'meals.date_created', ...userFields)
			.where('meals.id', id)
			.first()
			.leftJoin('caloriecounter_users AS usr', 'meals.userId', 'usr.id');
	},
	getMealsByUser(db, userId) {
		return db('meals')
			.select('meals.id', 'meals.alldaycalories', 'meals.date_created', ...userFields)
			.where({ userId })
			.leftJoin('caloriecounter_users AS usr', 'meals.userId', 'usr.id');
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
		console.log(newMeal);
		return db.insert(newMeal).into('meals');
	},
	updateMeals(db, date, userid, alldaycalorie) {		
		return MealsService.getallMeals(db).where('dateofmeal', date).where('userid', userid).update(alldaycalorie);
	}
};

module.exports = MealsService;
