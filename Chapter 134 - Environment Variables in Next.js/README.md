# Environment Variables in Next.js

In our codebase, we'll have some variables which are to be kept secret.  
We can put those "secret "variables in a file called `.env.local` and they will be a secret, as we intended.

Instead of hardcoding `API_KEY = "sk_live_abcd123` in your code, you store that in a `.env.local` file and use `process.env.API_KEY` to get the value.

**Secrets like DB passwords, API keys, etc. should stay out of your codebase.**

If these secrets gets hardcoded, it gets committed to git. Now, it's leaked forever. Git history never forgets it, even if you delete it later. Anyone with the access to that repo can see your database password. Would you want that?  

There are types in this `.env` thing. Let's see all of 'em.

---

### `.env`

If the variable is a normal setting, and is same everywhere, it should be put in `.env` file.

```javascript
NEXT_PUBLIC_APP_NAME = "yashlist"
NEXT_PUBLIC_APP_VERSION = 1.0.0
```

The app name is always "yashlist", no matter if you're on your laptop or live in Vercel. There's no reason to ever change this per environment.

---

### `.env.local`

This is where the real secrets go. This will be only on your machine, and it will be **gitignored** by default. All of your API keys, database passwords, etc. should go in this file.

```javascript
MONGO_URI = "mongodb+srv://yash:realpassword@cluster0.mongodb.net/passmate"
JWT_SECRET = "xk29fj28fjaklsdjf992"
API_KEY = "nasdh83hdbj821hiuwdbdin"
```

If these things are leaked on GitHub, anyone could read the data in your database.  
But, don't worry, this file will never be pushed to GitHub, as it's gitignored.

**NOTE FOR BEGINEERS:**

Putting a secret in `.env.local` doesn't protect it if you prefix it with `NEXT_PUBLIC_`.

If you add `NEXT_PUBLIC_` as a prefix to a secret variable, Next.js doesn't care that it's in `.env.local`, it sees the `NEXT_PUBLIC_` and ships that secret straight to the browser JavaScript, where anyone can open DevTools and see that secret.

```javascript
// This is wrong. This leaks your secret to every visitor's browser.
NEXT_PUBLIC_SECRET = "xk29fj28fjaklsdjf992"

// This is right. The secret stays only in the server, browser can't touch it.
SECRET = "xk29fj28fjaklsdjf992"
```

**Remember this:** If it's a secret, it never gets the `NEXT_PUBLIC_` prefix. End of debate.

`.env.local` only keeps secrets off GitHub. This `NEXT_PUBLIC_` prefix is a completely separate thing which overrides that protection and exposes it to the world. Don't mix those two up.

---

### `.env.development`

These variables get active only when you run `npm run dev`.  
That means these values are used during local development.

```javascript
NEXT_PUBLIC_API_URL = "http://localhost:5000/api"
```

While coding locally, your frontend calls your local backend at `localhost:5000`.

---

### `.env.production`

These variables get active only during `npm run build` (or) live site.  
That means these values are used during the time when the application is live. I mean, you don't want the application to fetch data from localhost here. That's only for local development, not for production. Applications need real URLs to fetch data.

```javascript
NEXT_PUBLIC_API_URL = "https://passmate-api.onrender.com/api"
```

Once deployed, frontend hits your real live backend URL.

---

Next.js automatically picks `.env.development` when you run `npm run dev`, and `.env.production` when you run `npm run build` (or) `npm start`. You never manually switch these.