import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Global get', () => {
  test('Should return api chat welcome message', async () => {
    const get = await request(app).get('/')
    expect(get.body).toBe('welcome to chat api')
  })
})
