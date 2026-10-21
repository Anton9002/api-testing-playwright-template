import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'
import { AccountDto } from '../DTO/account-dto'

test('get account info  with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/accounts/1', {
    headers: {
      'X-API-Key': 'my-api-key',
    },
  })

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.OK)

})

test('create an account with correct payload should receive code 201', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/accounts', {
    headers: {
      'X-API-Key': 'my-api-key',
    },
    data: new AccountDto('Mark', 'USD'),
  })

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  const accountId = responseBody.id
  console.log('Accound ID ', accountId)
  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.CREATED)

  const responseDeposit = await request.post(
    `https://shop.tl-academy.ee/api/accounts/${accountId}/deposit`,
    {
      headers: {
        'X-API-Key': 'my-api-key',
      },
      data: { amount: 25.5 },
    },
  )

  const responseBodyDeposit = await responseDeposit.json()
  const depositStatus = responseDeposit.status()
  console.log('response body:', responseBodyDeposit)
  console.log('statusCode:', depositStatus)
})
