describe('Cypress CRUD operation', () => {

  it('Create Location', () => {
    //Getting response from browserstack demo website 
    let placeId, expectedName = 'Mocha la Prem'
    cy.request({
      method: 'POST',
      url: 'maps/api/place/add/json',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        location: {
          lat: -38.383494,
          lng: 33.427362,
        },
        accuracy: 50,
        name: 'Landon',
        phone_number: '(+91) 983 893 3937',
        address: '29, side layout, cohen 007',
        types: ['shoe park', 'shop'],
        website: 'http://premrathore.com',
        language: 'French-IN',
      },
      qs: {
        key: 'qaclick123',
      },
    })
      .then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.equal(200);

        // Log the response body
        cy.log('API response -->', response.body);

        // Extract the place_id from the response body
        placeId = response.body.place_id;
        cy.log('Extracted place id -->', placeId);

        //Update the address
        cy.request({
          method: 'PUT',
          url: '/maps/api/place/update/json',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            place_id: placeId,
            name: expectedName,
            key: "qaclick123"
          },
          qs: {
            key: 'qaclick123',
          },
        }).then((updateResponse) => {
          cy.log('update API response-->', updateResponse)
          expect(updateResponse.status).to.equal(200)

          cy.wait(5000)
          cy.request({
            method: 'GET',
            url: 'maps/api/place/get/json',
            headers: {
              'Content-Type': 'application/json',
            },
            qs: {
              key: 'qaclick123',
              place_id: placeId
            },
          }).then((getResponse) => {
            expect(getResponse.status).to.equal(200)
            expect(getResponse.body.name).to.equal(expectedName)

          })
        })
      })



  })

})