# `useRouter` Hook

This hook returns you a object of methods which you can use.  
```javascript
const router = useRouter()
```
<br>

---

### 1. `router.push()`

This method is used for navigating the user to a specific route.

```javascript
"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => { router.push("/about") }} className="bg-green-700 px-7 py-2 rounded-lg">Take me to /about</button>
    </div>
  );
}
```
When the user clicks on the button, they get re-directed to `/about` page.

The important question is - "Why can't I just use `<Link>`?"  
The answer is *"Yes, you can. But, not everytime."*  

`<Link>` re-directs you without any questions. Click me and I'll take you there.  
But, if you want this to programmatical, you should use `router.push()`.  
It lets us do the navigation based on conditions. For example, if the user is logged-in, take them to `/dashboard`, or else throw them at `/login`.
```javascript
"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const isLoggedIn = false

  const handleClick = (isLoggedIn) => {
    (isLoggedIn)
      ? router.push("/dashboard")
      : router.push("/login")
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => { handleClick(isLoggedIn) }} className="bg-green-800 px-7 py-2 rounded-lg">Take me to the dashboard</button>
    </div>
  );
}
```
<br>

---

### 2. `router.replace()`

This method is the same as `router.push()`, but with a slight difference in the history part.  

In `router.push()`, if the user navigates to a different page and they press "back" button, they get redirected to the previous page they left.  
But, in `router.replace()`, when the user presses the "back" button, they don't get to see the previous visited page. That page is deleted in the history.

*"Okay? What's the use in it?"*

If the user logged-in and navigates to `/dashboard` via `router.push("/dashboard")`, and then presses the "back" button, they get re-directed to the `/login` page again, even though they are still logged-in.  
But, if you use `router.replace("/dashboard")`, when the user presses the "back" button, they won't get re-directed to the `/login` page. They get re-directed to the previous page before `/login`. This should be the expected behaviour.  

This happens because `router.replace()` deletes the previous page's history.

---