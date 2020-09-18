const express = require('express')
const MealsService = require('./meals-service')
const { requireAuth } = require('../middleware/jwt-auth')
const mealsRouter = express.Router()
const jsonBodyParser = express.json()


mealsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    MealsService.getAllMeals(req.app.get('db'))
      .then(meal => {
        res.json(meal.map(MealsService.serializeMeals))
      })
      .catch(next)
  })

mealsRouter
  .route('/:meal_id')
  .all(requireAuth)
  .all(checkMealExists)
  .get((req, res) => {
    res.json(MealsService.serializeMeals(res.meals))
  })

mealsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { userid, alldaycalories, } = req.body
    const newMeal = { userid, alldaycalories, }

    for (const [key, value] of Object.entries(newMeal))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

   

     
    MealsService.insertMeal(
      req.app.get('db'),
      newMeal
    )
      .then(meal => {
        res
          .status(201)
          .json(MealsService.serializeMeals(meal))
      })
      .catch(next)
    })

    async function checkMealExists(req, res, next) {
      try {
        const meal = await MealsService.getById(
          req.app.get('db'),
          req.params.meal_id
        )
    
        if (!meal)
          return res.status(404).json({
            error: `meal doesn't exist`
          })
    
        res.product = product
        next()
      } catch (error) {
        next(error)
      }
    }
    
    module.exports = mealsRouter