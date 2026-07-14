# `useSearchParams` Hook

This hook catches the query parameters and returns it.

```javascript
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
```

If you visit `http://localhost:3000/?name=Yashwanth`, the page will show: **Welcome, Yashwanth!**.  

It catched the query parameter `name` using the `get()` function, so we can use it in our components.

---