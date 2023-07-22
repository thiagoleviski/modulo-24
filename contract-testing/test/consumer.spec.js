import 'dotenv/config'
import { Pact } from "@pact-foundation/pact"
import { resolve } from 'path'
import { eachLike, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import { userList } from '../request/user.request';

const mockProvider = new Pact({
    consumer: 'ebac-demo-store-admin',
    provider: 'ebac-demo-store-server',
    port: parseInt(process.env.MOCK_PORT),
    log: resolve(process.cwd(), 'logs', 'pact.log'),
    dir: resolve(process.cwd(), 'pacts')
})

describe('Consumer Test', () => {

    beforeAll(async () => {
        await mockProvider.setup().then(() => {
            mockProvider.addInteraction({
                uponReceiving: 'a request',
                withRequest: {
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg2NzU0NTg4LCJleHAiOjE2ODY5MjczODh9.H2Jl5IppUyBdtJdhQe45eT33uRLgYXPzX-qewFu7d9U',
                        "Content-Type": 'application/json'
                    },
                    body: {
                        "operationName": "users",
                        "variables": {},
                        "query": "query users($where: UserWhereInput, $orderBy: UserOrderByInput, $skip: Float, $take: Float) {\n  items: users(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    createdAt\n    firstName\n    id\n    lastName\n    roles\n    updatedAt\n    username\n    __typename\n  }\n  total: _usersMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": 'application/json;charset=utf-8'
                    },
                    body: {
                        "data": {
                            "items": eachLike(
                                {
                                    "createdAt": somethingLike("2023-06-14T14:54:47.949Z"),
                                    "firstName": somethingLike("admin"),
                                    "id": somethingLike("clivu2kjx01450kunuvkj8gia"),
                                    "lastName": somethingLike("admin"),
                                    "roles": ["user"],
                                    "updatedAt": somethingLike("2023-06-14T14:54:47.950Z"),
                                    "username": somethingLike("admin"),
                                    "__typename": somethingLike("User")
                                },
                                { min: 2 }
                            ),
                            "total": {
                                "count": "2",
                                "__typename": "MetaQueryPayload"
                            }
                        }
                    }
                }
            })
        })
    })

    afterAll(() => mockProvider.finalize())
    afterEach(() => mockProvider.verify())
    it('should return user list', () => {
        userList().then(response => {
            const { firstName, lastName } = response.data.data.items[1]

            expect(response.status).toEqual(200)
            expect(firstName).toBe('admin')
            expect(lastName).toBe('admin')
        });
    })
})