<script lang="ts">
    import Card from "#lib/components/Card.svelte";
    import { formatDate, posts } from "#lib/posts/index.js";
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<div class="flex flex-col gap-3 text-lg pop-in-container">
    {#each posts as post (post.slug)}
        <Card class="group flex flex-col gap-1 p-5">
            <span class="flex items-baseline justify-between gap-4">
                <a href="/blog/{post.slug}" class="text-xl text-white">{post.title}</a>
                <time datetime={post.date} class="text-sm">{formatDate(post.date)}</time>
            </span>

            <span class="text-sm">{post.description}</span>
        </Card>
    {:else}
        <p>Nothing here yet.</p>
    {/each}
</div>