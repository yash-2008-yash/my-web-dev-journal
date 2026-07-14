'use client'
import { useSearchParams } from 'next/navigation'

export default function Welcome() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  return (
    <div className='text-4xl m-auto font-extrabold'>
      <h1>Welcome, {name}!</h1>
    </div>
  )
}