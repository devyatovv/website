<script lang="ts">
    import { formatDate } from "#lib/posts/index.js";
    let { data } = $props();
</script>

<svelte:head>
    <title>{data.post.title}</title>
    <meta name="description" content={data.post.description} />
</svelte:head>

<article class="flex flex-col gap-4 text-lg pop-in-container">
    <header class="flex flex-col gap-2 mb-2">
        <h1 class="text-3xl font-bold text-white">{data.post.title}</h1>
        <time datetime={data.post.date} class="text-sm">{formatDate(data.post.date)}</time>
    </header>

    <hr class="border-t border-border/40" />
    <data.post.component />
</article>

<style>
    article :global(:is(h2, h3, h4)) {
        color: white;
        font-weight: bold;
    }

    article :global(h2) {
        font-size: var(--text-2xl);
    }

    article :global(h3) {
        font-size: var(--text-xl);
    }

    article :global(a) {
        color: var(--color-link);
        text-decoration: underline;
    }

    article :global(code) {
        font-size: 0.8em;
        background: color-mix(in oklab, white 10%, transparent);
        border-radius: var(--radius-sm);
        padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 1);
    }

    article :global(pre) {
        background: color-mix(in oklab, white 5%, transparent) !important;
        border: 1px solid rgb(0 0 0 / 0.6);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-inset-subtle);
        padding: calc(var(--spacing) * 4);
        overflow-x: auto;
    }

    article :global(pre code) {
        background: none;
        padding: 0;
    }

    article :global(:is(ul, ol)) {
        padding-left: calc(var(--spacing) * 6);
    }

    article :global(ul) {
        list-style: disc;
    }

    article :global(ol) {
        list-style: decimal;
    }

    article :global(blockquote) {
        border-left: 2px solid color-mix(in oklab, white 25%, transparent);
        padding-left: calc(var(--spacing) * 4);
    }
</style>