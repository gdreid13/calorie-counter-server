const express = require('express')
const MealService = require('./meals-service')
const { requireAuth } = require('../middleware/jwt-auth')
const productsRouter = express.Router()
const jsonBodyParser = express.json()


mealRouter
  .route('/')
  .get((req, res, next) => {
    MealService.getAllProducts(req.app.get('db'))
      .then(meal => {
        res.json(meal.map(MealService.serializeMeal))
      })
      .catch(next)
  })

mealRouter
  .route('/:meal_id')
  .all(requireAuth)
  .all(checkMealExists)
  .get((req, res) => {
    res.json(MealService.serializeProduct(res.product))
  })

mealRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { userId, alldaycalories, } = req.body
    const newMeal = { userId, alldaycalories, }

    for (const [key, value] of Object.entries(newMeal))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newMeal.author_id = req.user.id


    MealService.insertProduct(
      req.app.get('db'),
      newMeal
    )
      .then(meal => {
        res
          .status(201)
          .json(MealService.serializeProduct(meal))
      })
      .catch(next)
    })

    async function checkMealExists(req, res, next) {
      try {
        const meal = await MealService.getById(
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
    
    module.exports = mealRouter