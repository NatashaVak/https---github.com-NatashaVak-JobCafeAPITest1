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

  it('search by position', () => {
    cy.request('/?position=Manager').then((response) => {
      let resultsList = response.body.content
      console.log(resultsList)
      expect(response.status).equal(200)

      for (let i = 0; i < resultsList.length; i++) {
        expect(resultsList[i].position).equal('Manager')
      }
    })
  })
 

  it('search by date', () => {
    cy.request('/?date=2023-01-03').then((response) => {
      let resultsList = response.body.content
      console.log(resultsList)
      expect(response.status).equal(200)

      for (let i = 0; i < resultsList.length; i++) {
        expect(resultsList[i].date).equal('2023-01-03T09:35:51.851-05:00')
      }
    })
  })
})


