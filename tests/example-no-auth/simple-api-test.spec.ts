import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'
import { ProductDTO } from '../DTO/product-dto'

test('get product with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/1')

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.OK)
})

test('get non existing product should receive code 404', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/999')

  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  //console.log('response body:', responseBody)
  // Check if the response status is 404
  expect(statusCode).toBe(StatusCodes.NOT_FOUND)
})

test('get product with invalid id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/products/abc')

  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  //console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
})

test('post product with correct mandatory only data should receive code 201', async ({
  request,
}) => {
  // prepare request body with only mandatory fields
  const requestBody = {
    name: 'Orange',
    category: 'Fruit',
    price: 2.39,
    //quantity: 10,
  }
  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.CREATED)
  // check that body.name is string type
  expect(typeof responseBody.name).toBe('string')
  expect(responseBody.name).toBe('Orange')
  // check that body.price is number type
  expect(typeof responseBody.price).toBe('number')
  //expect(responseBody.available).toBeFalsy()
})

test('post product with correct mandatory only data and quantity should receive code 201', async ({
  request,
}) => {
  // prepare request body with only mandatory fields

  const requestBody = new ProductDTO("Kiwi", "Fruit", 2.39, 25)

  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.CREATED)
  // check that body.name is string type
  expect(typeof responseBody.name).toBe('string')
  expect(responseBody.name).toBe('Kiwi')
  // check that body.price is number type
  expect(typeof responseBody.price).toBe('number')
  expect(responseBody.quantity).toBe(25)
  expect(responseBody.available).toBeTruthy()
  //expect(responseBody.available).toBeFalsy()
})

test('fail to create a product with invalid name should receive code 400', async ({
  request,
}) => {
  // prepare request body with only mandatory fields

  const requestBody = new ProductDTO('', 'Fruit', 0, 25)

  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  //console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
  // check that body.name is string type
  //expect(typeof responseBody.name).toBe('string')
  //expect(responseBody.name).toBe('Kiwi')
  // check that body.price is number type
  //expect(typeof responseBody.price).toBe('number')
  //expect(responseBody.quantity).toBe(25)
  //expect(responseBody.available).toBeTruthy()
  //expect(responseBody.available).toBeFalsy()
})

test('failed to create product with mising mandatory name should receive code 400', async ({
  request,
}) => {
  // prepare request body with only mandatory fields
  const requestBody = {
    category: 'Fruit',
    price: 2.39,
  }
  // Send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/products', {
    data: requestBody,
  })
  // parse raw response body to json
  //const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  //console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
  // check that body.name is string type
  //expect(typeof responseBody.name).toBe('string')
  //expect(responseBody.name).toBe('Kiwi')
  // check that body.price is number type
  //expect(typeof responseBody.price).toBe('number')
  //expect(responseBody.quantity).toBe(25)
  //expect(responseBody.available).toBeTruthy()
  //expect(responseBody.available).toBeFalsy()
})
