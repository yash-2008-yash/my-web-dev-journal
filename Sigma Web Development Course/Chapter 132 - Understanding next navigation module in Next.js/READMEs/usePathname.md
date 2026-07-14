# `usePathname` Hook

This hook returns the current URL's pathname as a string.  
If we are in `/about`, it returns "/about".

*"What the hell will I do with that pathname?"*

It might seem useless at first, but you are wrong.  

In websites which has a Navbar or Sidebar with many routes, when you click on any one route, that route in the Navbar/Sidebar gets highlighted. Seen this in any websites? They use `usePathname` for doing this. Now, who's useless here, lol?

```javascript
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex gap-4 items-center bg-purple-500 p-4 text-white">
      <Link href="/" className={pathname === '/' ? 'bg-white text-purple-500 px-3 py-2 rounded-4xl' : ''}>Home</Link>
      <Link href="/about" className={pathname === '/about' ? 'bg-white text-purple-500 px-3 py-2 rounded-4xl' : ''}>About</Link>
    </div>
  )
}
```

This is called **Active Nav Link Highlighting**, by the way.

---