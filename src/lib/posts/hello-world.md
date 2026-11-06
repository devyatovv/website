---
title: Hello World
description: The first post on this blog.
date: "2026-07-16"
---

Welcome to my blog. Posts are markdown files compiled by mdsvex, so Svelte
components and expressions work inside them too.

## A heading

Some more text under a heading, with [a link](https://svelte.dev) and a bit
of `inline code`.

```py
print("Hello world!")
```

```ts
interface Post {
    slug: string;
    title: string;
    date: string;
}

export function newest(posts: Post[]): Post | undefined {
    return posts.toSorted((a, b) => b.date.localeCompare(a.date)).at(0);
}
```

```diff ts
export function greet(name: string): string {
-     return `Hello, ${name}!`;
+     return `Hi, ${name}!`;
}
```