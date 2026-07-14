# SSR, SSG & ISR in Next.js

---

## SSR - Server Side Rendering

Cut the textbook definition and see this: **Think of a restaurant.**

That's what SSR exactly is. Every time someone visits the page, the server cooks the HTML fresh, right at that moment, and sends it. Nothing pre-made is sitting around to be served.

***REAL EXAMPLE***: Bank Account Dashboard - You open it, and it needs to show your balance, right now, not what your balance was 5 minutes ago. So, the server has to build that page freshly every single time you open it. In this scenarios, data changes constantly, so SSR is a must.

```javascript
async function getProducts() {
  const res = await fetch('https://api.example.com/products', { cache: 'no-store' })
  return res.json()
}
```
That `cache: 'no-store'` makes the data fetching SSR, which means it gets freshly fetched on every click.

<br>

| PROS | CONS |
| :---: | :---: |
| Always the fresh data is served. User sees exactly what's true right now. | Slower than static pages because the server has to build the page on every click. |
| Good for SEO because Google's crawler gets full HTML by the server, not a blank page waiting for JS. | Server overload can happen. If many people hit the page at once, the server has to cook new pages at once, which can get expensive/heavy. |

**SSR in one line:**  
Freshly made, on-demand, every single request, no caching.

Since the page is cooked fresh every time, it's a bit slower than food that's already sitting on the counter to grab (static pages). Those are SSG, which we're gonna see next.

---

<br>

## SSG - Static Site Generation

**SSG** is the cook who gives you pre-made food. Instead of cooking the food freshly when you order, and serve it (like SSR), this makes a big-batch of the food before even the restaurant opens.

Next.js builds the HTML once during the build time (`npm run build`), and then just serves that same pre-built HTMl to every user who visits the page. Server doesn't work per request like SSR.

**NOTE:** This is default.

***REAL EXAMPLE***: Portfolio Websites - In these kind of websites, the data doesn't change constantly. It's just static. Server doesn't have to build the page everytime, because there's nothing new. It's a waste of resources. If we use SSG in this, server serves the pre-built HTML to the user with super-speed. Obviously, it would be **super-speed** because pre-made HTML is being served here. Server doesn't have to stress much.

```javascript
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', { cache: 'force-cache' })
  return res.json()
}
```
That `cache: 'force-cache'` makes the data fetching SSG, which means the data isn't freshly fetched at every visit.

<br>

| PROS | CONS |
| :---: | :---: |
| The page is served blazing fast because the page is pre-built. Nothing is being created at that moment. | Data can be out-dated. If the content changes after build, the page won't know it until you rebuild using `npm run build`. |
| Cheap to run because server does zero work per visit, since it's just serving pre-made HTML file. | Deployement is **all-or-nothing**. One content change means rebuilding and redeploying the entire site, not just that one page. |
| Can handle massive traffic with no sweat because even if one million people visit, it doesn't matter. It's just a static file. Nothing more work is done here. | Can't respond to user inputs. Stuff like "Show me results filtered by X" doesn't work because there's no server running any logic per request. |

**SSG in one line:**  
Pre-made in bulk before anyone shows up, same file served to everyone, no cooking per visit.

That last con right there — "data goes stale, need a full rebuild" — is exactly the problem ISR was invented to fix. It's basically SSG with a fix for freshness.

The main problem in this SSG is that the data doesn't get updated until a full rebuild.  
ISR was invented for this exact reason. **To fix this**. Now, you're gonna see it.

---

<br>

## ISR - Incremental Static Regeneration

This one is the coolest among the three, if I'm being real.

This also serves the pre-made food like SSG, but... there's a catch.  
The chef silently makes a fresh batch every X unit of time, in the background, without closing the restaurant.

This is **ISR**. You get the speed of SSG, but it also refreshes the page every X secons, so the data doesn't stay outdated like pure SSG pages.

***REAL EXAMPLE:*** An E-Commerce product page. Prices and stock changes, yes, but occasionally. So, you don't need:
- Full SSR. That would be too slow, and too much server load.
- Full SSG. The data would go stale (outdated).

**ISR** would be the best choice. Best of both. Fast, and auto-refreshes every minute or hour, you decide it.

```javascript
async function getProducts() {
  const res = await fetch('https://api.example.com/products', { next: { revalidate: 180 } })
  return res.json()
}
```
That `next: { revalidate: 180 }` makes the page refresh *(re-build, actually)* every 180 seconds / 3 minutes. The building process is being done in the background.

<br>

| PROS | CONS |
| :---: | :---: |
| Fast like SSG. Pages are pre-built and served instantly, no per-request server work for most users. | Still not truly **"real time"**. There's this thing `revalidate time` where data can be stale. For example, if the time is set to 60 seconds, someone could see 59-second-old-data. |
| Auto-refreshes, so no manual rebuilding and redeploying needed. The content updates itself every X unit of time, which you can set. | Slightly complex to reason about the `revalidate time`. You gotta pick the right time for your use case. If too short, it's basically SSR with more code. If too long, the data still feels stale. |
| Best of both worlds. You get the freshness of SSR, without the SSR server load on every damn request. | Silent failures can happen. If the background regen somehow fails, you'll have no damn idea of it unless you are monitoring it. No big errors will be shown. The page could be showing week-old data and you'd have zero clue. |

---