import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../src/App'

describe('App', () => {
  test('Should return App page', () => {
    render(<App />)
    expect(screen.queryByText('Welcome to chat')).toBeInTheDocument()
  })
})
