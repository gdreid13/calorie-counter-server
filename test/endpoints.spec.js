const knex = require('knex');
const app = require('../src/app');
const bcrypt = require('bcryptjs');

const { prepareTest, tools } = require('./test-helpers');
const { testUsers, } = prepareTest.getData();
const data = { testUsers, };


describe('ALL ENDPOINTS', () => {
    let db;
    before('makeAuthHeader knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());
    before('cleanup', () => prepareTest.cleanTables(db));
    afterEach('cleanup', () => prepareTest.cleanTables(db));

    const endPoints = ['meals'];

    endPoints.forEach(endpoint => {
        const validId = 2;
        const invalidId = 12345;
        const { get, post, invalidFetch, validFetch, getItemById } = tools.makeFetchRequests(endpoint, validId, invalidId);
        const { AllItems, NewItem, UpdatedFields } = prepareTest.getTestData(endpoint);

        describe(`ENDPOINT ${endpoint}`, () => {
            describe(`/api/${endpoint}`, () => {
                context(`Given no ${endpoint}`, () => {
                    it(`respond 200 with an empty list`, () => {
                        return get.expect(200, []);
                    });
                });
                context(`Given there are ${endpoint}`, () => {
                    beforeEach('Insert data', () => prepareTest.seedTables(db, data))
                    it(`GET all ${endpoint}`, () => {
                        return get.expect(200, AllItems);
                    });
                    it(`POST new ${endpoint}`, () => {
                        return post.send(NewItem).expect(201)
                            .expect(res => {
                                expect(res.body).to.have.property('id')
                                expect(res.headers.location).to.eql(`/api/${endpoint}/${res.body.id}`)
                            });
                    });
                });
            });
            describe(`/api/${endpoint}/:id`, () => {
                beforeEach('Insert data', () => prepareTest.seedTables(db, data))
                context(`Given ${endpoint} not found (id: ${invalidId})`, () => {
                    invalidFetch.forEach(obj => {
                        for (const key in obj) {
                            it(`${key}`, () => {
                                return obj[key].expect(404, {
                                    error: {
                                        message: `Requested item doesn't exist`
                                    }
                                });
                            });
                        };
                    });

                });
                context(`Given ${endpoint} found (id: ${validId})`, () => {
                    UpdatedFields.forEach(obj => {
                        for (const key in obj) {
                            it(`PATCH ${key}`, () => {
                                const fieldsToUpdate = obj[key]
                                if (key === 'With_password') {
                                    return validFetch.PATCH.send(fieldsToUpdate)
                                        .expect(200)
                                        .then(res => validFetch.GET
                                            .then(row => {
                                                return bcrypt.compare(fieldsToUpdate.password, row.body.password)
                                                    .then(match => expect(match).to.be.true);
                                            })
                                        );
                                };
                                return validFetch.PATCH.send(fieldsToUpdate)
                                    .expect(200)
                                    .then(res => validFetch.GET
                                        .then(row => {
                                            for (const field in fieldsToUpdate) {
                                                expect(row.body[field]).to.eql(fieldsToUpdate[field]);
                                            };
                                        })
                                    );
                            });
                        };
                    });

                    it.only(`GET`, () => {
                        return validFetch.GET.expect(200, getItemById);
                    });
                    it(`DELETE`, () => {
                        const expectedItems = AllItems.filter(item => item.id !== validId)
                        return validFetch.DELETE.expect(200)
                            .then(() => get.expect(200, expectedItems));
                    });
                });
            });
        });
    });
});
