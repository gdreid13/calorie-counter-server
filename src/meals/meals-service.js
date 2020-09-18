const xss = require('xss');

const MealsService = {
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

	insertMeal(db, newMeal) {
		return db
			.insert(newMeal)
			.into('meals')
			.returning('*')
			.then(([ meal ]) => meal)
	
	}
};

module.exports = MealsService;
