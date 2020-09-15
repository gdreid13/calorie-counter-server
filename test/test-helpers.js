const app= require('../src/app')
const bcrypt= require('bcryptjs')

const makeTables= {
    users(){
        return [
            {   id: 1,
                full_name:'firstName',
                username:'testusername1',password: 'testPassword1' ,
                age: 18 ,gender: 'Male' ,
                last_modified: '2020-08-01T07:57:55.195Z'    },
    
            {   id: 2,
                full_name:'firstName',
                username:'userName2' ,password: 'testPassword2' ,
                age: 18 ,gender: 'Female' ,
                last_modified: '2020-08-01T07:57:55.195Z'  },
    
            {   id: 3,
                full_name:'firstName' ,
                username:'userName3' ,password: 'testPassword3' ,
                age: 18 ,gender: 'Male' ,
                last_modified: '2020-08-01T07:57:55.195Z'   },
        ]
    },   
}
const prepareTest={
    getData(){
        const testUsers= makeTables.users()
        return {testUsers}
    },
    getTestData(name){
        const {testUsers}=this.getData()
        const {newUser}= tools.makeNewItem()
        const {user}= tools.makeUpdatedItem()
        
        const array=[
            {db:"users",all: testUsers,newItem:newUser, updatedFields:user},
        ]
        const obj= array.find(obj=>obj.db===name) || {all:[],newItem:{},updatedFields:[]}
        const AllItems= obj.all
        const NewItem= obj.newItem
        const UpdatedFields= obj.updatedFields

        return {AllItems,NewItem,UpdatedFields}
    },
    seedTables(db,data){
        const {testUsers}= data
        return this.seedTable(db,'users',testUsers)
            //.then(()=>testReviews.length && this.seedTable(db,'reviews',testReviews))
    },
    seedTable(db,dbName,items){
        return db.into(dbName).insert(items)
            .then(()=>db.raw(
                `SELECT setval('${dbName}_id_seq',?)`,
                [items[items.length-1].id]
            ))
    },
    seedUsers(db,users){
        /*
        const preppedUsers= users.map(user=>({
            ...user,
            password: bcrypt.hashSync(user.password,1)
        }))*/
        return db.into('users').insert(users)
            .then(()=>db.raw(
                `SELECT setval('users_id_seq',?)`,
                [users[users.length-1].id], //update the auto sequence to stay in sync
            ))
    },
    cleanTables(db){
        return db.raw(
            `TRUNCATE
                reports,
                movie_cast,
                reviews,
                artists,
                movies,
                users
            RESTART idENTITY CASCADE`
        )
    }
}

const tools={
    makeFetchRequests(endpoint,valid,invalid){
        const token= `Basic ${process.env.API_TOKEN}`
        const get= supertest(app).get(`/api/${endpoint}`).set('Authorization',token)
        const post= supertest(app).post(`/api/${endpoint}`).set('Authorization',token)
        const invalidFetch=[
            {GET: supertest(app).get(`/api/${endpoint}/${invalid}`).set('Authorization',token)},
            {DELETE: supertest(app).delete(`/api/${endpoint}/${invalid}`).set('Authorization',token)},
            {PATCH: supertest(app).patch(`/api/${endpoint}/${invalid}`).set('Authorization',token)}
        ]
        const validFetch={
            GET: supertest(app).get(`/api/${endpoint}/${valid}`).set('Authorization',token),
            DELETE: supertest(app).delete(`/api/${endpoint}/${valid}`).set('Authorization',token),
            PATCH: supertest(app).patch(`/api/${endpoint}/${valid}`).set('Authorization',token)
        }

        return {get,post,invalidFetch,validFetch}
    },
    makeAuthHeader(user){
        const token = Buffer.from(`${user.user_name}:${user.password}`).toString(`base64`)
        return `Bearer ${token}`
    },
    makeNewItem(){
        const newUser= {
            "full_name": "Alex", 
            "username": "aw1990", "password": "11AAaa!!",
            "age": 18, "gender": "Male"
        }
        
        return {newUser}
    },
    makeUpdatedItem(){
        const user=[
            {"With_password":{"password": "newP@ssword123"}},
            //{"Without_password":{"username": "newUserName"}}
        ]
        return {user}
    },
    hashPassword(password){
        return bcrypt.hash(password,12)
    },
}


module.exports= {makeTables,prepareTest,expected,tools}