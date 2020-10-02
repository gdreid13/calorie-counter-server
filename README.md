# calorie-counter-server

This is our second full stack capstone, as junior developers, to demonstrate our mastery of React, Node and PostgresSQL, . To learn more about our user stories, please read [HERE](https://docs.google.com/spreadsheets/d/10vr_gILvtYHT7AtwDcj6wCP0vuv-HUcrETIH3dWyJcU/edit#gid=0)

## Built with:
* Node JS
* Javascript
* Express
* PostgreSQL (Relational DBMS), DBeaver(GUI client)

## Installed packages:
* express (top-level function), morgan(logging),dotenv(to populate the process.env)
* cors(add header of CORS to the req),helmet(hide response headers)
* uuid(auto-generate a unique id),winston(logging library),xss(sanitizing tool
* knex(SQL query builder library), pq(driver for Postgres)
* bcryptjs (for hashing data), jsonwebtoken(to represent user's credentials)

**For development only:**

* nodemon(auto restart)
* mocha(testing framework), chai(assertion library), supertest(for http calls)
* postgrator-cli (to use migrations for PostgresSQL)

## Best practices/Security:

**Don't repeat yourself(DRY)**
- `src/utils/route-helpers.js`: general services/packages used by all routers
- `src/test/endpoint.ALL.spec.js`: tests are used by all endpoints

**Encapsulation**
* Customized service for each endpoint

**Separation of concerns**
- `src/middleware/general.js`: check items if they exist, sanitize user inputs
- `src/middleware/basic-auth.js`: check for user authorization
- `src/middleware/require-auth.js`: check for user authentication 
  
**Security**:
- Authorization: API token is required to get access to the db
- Authentication: user must log in with valid username/password to make any changes to the db.
- Data protection: Bcrypt is used to pseudonymise the passwords stored in the db
- Secure login: JWT is used to represent user credentials. 

## Links:

[Live version](https://calorie-counter-client.vercel.app/)

[API Server](https://sheltered-ravine-01866.herokuapp.com/)

[Github Client](https://github.com/gdreid13/calorie-counter-client)

## Learn more:

[Greg](https://github.com/gdreid13)
[Kidus](https://github.com/KidusY)
[Ty](https://github.com/tyonek)
[Duy](https://github.com/DuyLuu90)
