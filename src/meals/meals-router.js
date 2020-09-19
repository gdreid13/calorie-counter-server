const {express,path,jsonBodyParser,GeneralService}= require('../utils/route-helpers')
const { requireAuth } = require('../middleware/jwt-auth')

const MealsService = require('./meals-service')
const mealsRouter = express.Router()

//MIDDLEWARE:
const {checkItemExists,sanitizeItem}= require('../middleware/general')

mealsRouter.route('/')
  .all(requireAuth)
  .get((req, res, next) => {
      const {userId}= req.query
      if (userId) {
        MealsService.getMealsByUser(req.app.get('db'),userId)
        .then(meals=>{
          const fields=[,"alldaycalories",,"user:full_name",
          "user:age","user:gender","user:height","user:weight"]
          const sanitizedMeal= sanitizeItem(meals,fields)
          res.status(200).json(sanitizedMeal)
        }).catch(next)
      }
      else GeneralService.getAllItems(req.app.get('db'),'meals')
        .then(meals=>{
          const fields=["alldaycalories"]
          const sanitizedMeal= sanitizeItem(meals,fields)
          res.status(200).json(sanitizedMeal)
        }).catch(next)

    /*
mealsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    MealsService.getAllMeals(req.app.get('db'))
      .then(meal => {
        res.json(meal.map(MealsService.serializeMeals))
      })
      .catch(next)*/
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { userId, alldaycalories} = req.body
    const newMeal = { userId, alldaycalories}
    for (const [key, value] of Object.entries(newMeal))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
      })
    const sanitizedMeal= sanitizeItem(newMeal,['alldaycalories'])
    
    GeneralService.insertItem(req.app.get('db'),'meals',sanitizedMeal)
      .then(meal=>{
        res.status(201)
        .location(path.posix.join(req.originalUrl,`/${meal.id}`))
        .json(meal)
      })
      .catch(next)
    /*
    newMeal.author_id = req.user.id
    MealsService.insertMeals(req.app.get('db'),newMeal)
      .then(meal => {
        res.status(201).json(MealService.serializeMeals(meal))
      })
      .catch(next)
    */
  })
  

mealsRouter.route('/:id')
  .all(requireAuth)
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
      const {userId, alldaycalories}= req.body
      const mealToUpdate={userId,alldaycalories}
      return GeneralService.updateItem(req.app.get('db'),'meals',req.params.id,mealToUpdate)
        .then(()=>res.status(200).json('Success'))
        .catch(next)

  })
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
module.exports = mealsRouter