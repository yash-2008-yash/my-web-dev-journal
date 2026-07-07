# Styled JSX and other ways to style in Next.js

Tailwind CSS is the superior way of styling. I mean, when you create a Next.js app with `create-next-app@latest`, it literally asks if you want Tailwind CSS or not. It comes default with Next.js. It's so popular now.

But... there are still some ways to style JSX.  
For people who don't like Tailwind, you can use of these.

---

### 1. Styled JSX

This is built-in in Next.js. Zero setup required.

```javascript
"use client"

export default function Home() {
  return (
    <div className="card">
      <h1>I am styled with Styled JSX</h1>

      <style jsx>{`
        .card {
          padding: 16px;
          border-radius: 8px;
          background: #111;
        }
        .card:hover {
          background: #222;
        }
      `}</style>

    </div>
  );
}
```

Some things to know about Styled JSX:

- Styles are scoped to components only. So, there's no leaking and class collisions.
- If you want the styled JSX to be global, just use `<style jsx global>{...}`.
- It needs the page to be a client component, so it doesn't play well with server components.

---

### 2. CSS Modules

This is the community's actual favorite for scoped custom CSS now.

Zero config, works great with Server Components, scoped automatically.  
This is the default "if not Tailwind" pick in 2026.

<br>

`app/page.js`
```javascript
import styles from './button.module.css'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button className={styles.btn}>Click</button>
    </div>
  );
}
```

<br>

`app/button.module.css`
```css
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  background-color: green;
  width: fit-content;
}
```

---

### 3. Global CSS 

You get a `globals.css` file in your Next.js app. It's imported in the `layout.js` by default. So, the styles apply everywhere.

You can use this file to style things like fonts, base styles, etc. which remain same globally.

---

### 4. Sass (Syntactically Awesome Style Sheets) / SCSS (Sassy CSS)

This has built-in support. No extra Next.js config except installing it.
```bash
npm install -D sass
```

This method can be really useful because of it's features.

<br>

- Variables
```scss
$primary-color: #0070f3;
$spacing-unit: 8px;

.btn {
  background: $primary-color;
  padding: $spacing-unit * 2;
}
```

<br>

- Nesting
```scss
.card {
  padding: 16px;

  &:hover {
    background: #222;
  }

  .title {
    font-size: 20px;
  }
}
```

<br>

- Mixins *(Reusable style blocks, basically functions for CSS)*
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  @include flex-center;
}
```

<br>

- Built-in functions
```scss
.btn:hover {
  background-color: darken($primary-color, 10%);
}
```

This can be a great replacement for the people who don't want to use Tailwind CSS, but also don't want to write traditional CSS.

---

Finally...

I personally prefer using Tailwind CSS. It's fast, clean, and it's basically the default now. Some people really hate Tailwind, and that's completely okay. That's just different opinions. I mean, that's what humans do. Form opinions. Just respect others opinions and defend your opinion, too.

At the end of the day, use whatever fits your interests and needs. Everything will work, it's not like one's better than the other. It's just your liking. No one's gonna judge you for picking one over the other, like *"Ewwww. This guy's using Tailwind. Ewwww."* Nobody's gonna say that, lol.

Just choose what you want for yourself, not what others choose for you.

---