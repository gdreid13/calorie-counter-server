const xss = require('xss')

const MealService = {
  getAllMeal(db) {
    return db
      .from('meals AS meal')
      .select(
        'meal.id',
        'product.date_created',
        'meal.date_modified',
        'meal.alldaycalories',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'username', usr.user_name,
              'fullname', usr.full_name,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'caloriecounter_users AS usr',
        'meal.author_id',
        'usr.id',
      )
      .groupBy('meal.id', 'usr.id')
  },

  getById(db, id) {
    return MealService.getAllMeal(db)
      .where('meal.id', id)
      .first()
  },


  serializeMeal(meal) {
    const { author } = meal
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
        MealService.getById(db, meal.id)
      )
  },
}

module.exports = ProductsService