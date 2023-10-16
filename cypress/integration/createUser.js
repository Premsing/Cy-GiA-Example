/// <reference types="Cypress" />
const dataJson = require('../fixtures/createuser.json')
describe('Create user',()=>{
    
    let accesstoken= '52f03dbe22478d59078410bf2631f5d44dc190e6ae949f5bd191545a07a1b04e'
    let testEmail = generateRandomEmail();

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(7);
        return `${randomString}@example.com`;
    }
    it('POST request API', ()=>{

        cy.request({
            method: 'POST', 
            url: 'https://gorest.co.in/public/v2/users', 
            headers: {
                'Authorization': 'Bearer '+ accesstoken,
              },
            body: {
                "name": dataJson.name,
                "email": testEmail,
                "gender": dataJson.gender,
                "status": dataJson.status
            }
          }).then( (res) => {
          
            expect(res.status).to.eq(201) // 201
            
            expect(res.body.name).to.eq(dataJson.name)
            expect(res.body.email).to.eq(testEmail)
            expect(res.body).has.property('gender',dataJson.gender)
            cy.log(JSON.stringify(res))
          })

    })
})

  