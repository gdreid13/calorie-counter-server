const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const {password, user_name, full_name, gender, age, weight, height } = req.body

    for (const field of ['full_name', 'password','user_name','gender','age','weight','height'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    // TODO: check username doesn't start with spaces

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,            
              full_name,
              weight,
              gender,
              age,
              height             
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })


  usersRouter
    .get('/',(req,res,next)=>{
      UsersService.getAllUsers(req.app.get('db'))
        .then(users=>res.json(users))
        .catch(next)
    })
module.exports = usersRouter