const xss = require('xss')

const MealsService = {
  getAllMeals(db) {
    return db
      .from('meals AS meal')
      .select(
        'meal.id',
        'meal.user_id',
        'meal.date_created',
        'meal.date_modified',
        'meal.alldaycalories',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'alldaycalories', usr.alldaycalories,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified,
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'caloriecounter_users AS usr',
        'meal.author.id',
        'usr.id',
      )
      .groupBy('meal.id', 'usr.id')
  },

  getById(db, id) {
    return MealsService.getAllMeals(db)
      .where('meal.id', id)
      .first()
  },


  serializeMeals(meal) {
    const { author} = meal
    return {
      id: meal.id,
      alldaycalories: xss(meal.alldaycalories),
      date_created: new Date(meal.date_created),
      author: {
        id: author.id,
        user_name: author.user_name,
        full_name: author.full_name,
        date_created: new Date(author.date_created),
        date_modified: new Date(author.date_modified) || null
      },
    }
  },

  insertMeal(db, newMeal) {
    return db
      .insert(newMeal)
      .into('meals')
      .returning('*')
      .then(([meal]) => meal)
      .then(meal =>
        MealsService.getById(db, meal.id)
      )
  },
}

module.exports = MealsService