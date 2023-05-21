/// <reference types = "Cypress"/>


describe('Get Jobs Test', () => {

    it('get all jobs', () => {
      cy.request('/').then((response) =>{
      console.log(response),
      expect(response.status).equal(200),
      expect(response.statusText).equal("OK")
      })
    })
  
    it('verify jobs result list', () => {
      cy.request('/').then((response) =>{
      console.log(response.body.content),
      expect(response.body.content).not.empty
      })
    })
  
    it('job listing has all the details', () => {
      cy.request('/').then((response) =>{
       var result = response.body.content[1]
       console.log(result)
        expect(result).have.property("id")
        expect(result.id).equal("63b44a8174f47208c44470b3")
  
        expect(result).have.property("location")
       expect(result.location).equal("Edmonton, AB")
  
     expect(result).have.property("position")
      expect(result.position).equal("Project Manager IV - Enbridge")
        
        expect(result).have.property("link")
       expect(result.link).contain("http")
     })
         })
  
     it('search by location', () => {
     cy.request('/?location=Toronto').then((response) =>{
      let resultsList = response.body.content
     console.log(resultsList)
      expect(response.status).equal(200)
      
      for(let i=0; i<resultsList.length; i++){
        expect(resultsList[i].location).equal('Toronto, ON, Canada')
      }
  
  
  
  
  
      })
   })
    
   })