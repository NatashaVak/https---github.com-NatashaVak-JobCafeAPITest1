/// <reference types = "Cypress"/>


describe('Get Jobs Test', () => {



  it('job listing has all the details', () => {
    cy.request('/').then((response) => {
      var result = response.body.content[2]
      console.log(result)
      expect(result).have.property("id")
      expect(result.id).equal("63b4499c74f47208c44470aa")

      expect(result).have.property("location")
      expect(result.location).equal("Edmonton, AB")

      expect(result).have.property("company")
      expect(result.company).equal("Completing LLC")

      expect(result).have.property("position")
      expect(result.position).equal("IT Project Manager")

      expect(result).have.property("time")
      expect(result.time).contain("1 hour ago")

      expect(result).have.property("salary")
      expect(result.salary).equal("unknown")

      expect(result).have.property("seniority")
      expect(result.seniority).equal("manager")

      expect(result).have.property("date")
      expect(result.date).contain("2023-01-03T09:28:07.025-05:00")

    })
  })

  it('search by company', () => {
    cy.request('/?company=Apple').then((response) => {
      let resultsList = response.body.content
      console.log(resultsList)
      expect(response.status).equal(200)

      for (let i = 0; i < resultsList.length; i++) {
        expect(resultsList[i].company).equal('Apple')
      }
    })
  })


  it('search by location and company', () => {
    cy.request('/?location=Toronto&company=Dice').then((response) => {
      let resultsList = response.body.content
      console.log(resultsList)
      expect(response.status).equal(200)

      for (let i = 0; i < resultsList.length; i++) {
        expect(resultsList[i].location).equal('Toronto, ON, Canada');
        expect(resultsList[i].company).equal('Dice')
      }

    })
  })
})

 
it('search by date', () => {
 cy.request('GET', '/?date=2021-07-11')
 .then((response) => {
  expect(response.status).to.eq(200);

  })
})
 

  it('search parameters in GET request by salary', () => {
    cy.request({
      method: 'GET',
      url: '/',
      qs: {
        salary: 'US$20–US$28 an hour'
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
    

    })
  })

  describe('Error messages ', () => {


    it('search by date', () => {
     cy.request('GET', '/?company=RTGFD')
     .then((response) => {
       expect(response.status).to.eq(204);
      
       })
    })

    it('incorrect date', () => {
      cy.request('POST', '/date?date=000')
      .then((response) => {
       expect(response.status).to.eq(404);
       expect(response.body.errorMessage).to.eq('Not Found')
    })
  })

  
it('wrong key', () => {
  cy.request('POST', 'create?key=9999')
  .then((response) => {
   expect(response.status).to.eq(400);
   expect(response.body.errorMessage).to.eq('Bad Request')
})
})
  })