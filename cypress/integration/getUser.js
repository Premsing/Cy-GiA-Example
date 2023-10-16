/// <reference types="Cypress" />

describe('api test cases',() => {

    let accesstoken= '52f03dbe22478d59078410bf2631f5d44dc190e6ae949f5bd191545a07a1b04e'
    it('get user', () => {        
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users',
            headers: {
                'Authorization': 'Bearer '+ accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(10)
        })
    }) 
    
    it('get user by id', () => {        
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/628284',
            headers: {
                'Authorization': 'Bearer '+ accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Deeptiman Kaul')
        })
    })
})