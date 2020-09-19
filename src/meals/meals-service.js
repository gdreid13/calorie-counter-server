const xss = require('xss');

const userFields=[
  'usr.id AS user:id',
  'usr.full_name AS user:full_name',
  'usr.age AS user:age',
  'usr.gender AS user:gender',
  'usr.height AS user:height',
  'usr.weight AS user:weight',
]

const MealsService = {

  getMealById(db,id){
    return db('meals')
    .select('meals.id','meals.alldaycalories','meals.date_created',...userFields)
    .where('meals.id',id).first()
    .leftJoin('caloriecounter_users AS usr','meals.userId','usr.id')
    
  },
  getMealsByUser(db,userId){
      return db('meals')
        .select('meals.id','meals.alldaycalories','meals.date_created',...userFields)
        .where({userId})
        .leftJoin('caloriecounter_users AS usr','meals.userId','usr.id')
  }
}


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