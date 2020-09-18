const xss = require('xss')

const MealsService = {
  getAllMeals(db) {
    return db
      .from('meals AS meal')
      .select(
        '*',
      )
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