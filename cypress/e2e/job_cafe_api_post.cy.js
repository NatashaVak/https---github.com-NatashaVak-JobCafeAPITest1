///<reference types = "Cypress"/>
import { data } from '../fixtures/params.json'
let date = new Date().toJSON()
describe('Get Jobs Test', () => {

    let positionBody = {
        "position": "QA",
        "company": "mycompanylev1",
        "location": "Toronto",
        "seniority": "junior",
        "link": "www.linkedin.com",
        "description": "some text",
        "time": "two hours ago",
        "salary": "100k",
        "date": date
    }

    let adminKey = 'adminadmin'
    let id;

    it('create job listing test', () => {
        cy.request({
            method: 'POST',
            url: '/create',
            body: positionBody,
            qs: { key: adminKey }
        }).then((response) => {
            console.log(response.body)
            id = response.body.id
            expect(response.status).equal(201)
            expect(response.body.company).equal('mycompanylev1')
            cy.deletePositionById(id)
        })
    })

    it('create job listing test from fixture', () => {
        data.forEach(element => {
            cy.request({
                method: 'POST',
                url: '/create',
                body: element,
                qs: { key: adminKey }
            }).then((response) => {
                console.log(response.body)
                id = response.body.id
                expect(response.status).equal(201)
                expect(response.body.company).equal(element.company)
                cy.deletePositionById(id)
            })
        })
   })
})