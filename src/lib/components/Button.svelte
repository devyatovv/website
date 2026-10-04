<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

    let {
        children,
        class: className = "",
        disabled = false,
        href,
        ...rest
    }: HTMLButtonAttributes & HTMLAnchorAttributes = $props();

    const classes = $derived(`group inline-block ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`);
    const visualClasses = $derived(
        `glass-panel shadow-inset-medium block rounded-lg px-4 py-1.5 text-white select-none ${disabled ? "opacity-35" : "will-change-transform transition-all duration-150 ease-out group-hover:bg-white/10 group-active:scale-90"}`
    );
</script>

{#if href}
    <a {href} class={classes} {...rest}>
        <span class={visualClasses}>
            {@render children?.()}
        </span>
    </a>
{:else}
    <button class={classes} {disabled} {...rest}>
        <span class={visualClasses}>
            {@render children?.()}
        </span>
    </button>
{/if}