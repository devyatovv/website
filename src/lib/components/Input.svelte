<script lang="ts">
    import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";

    type Props = (HTMLInputAttributes & HTMLTextareaAttributes) & {
        multiline?: boolean;
        value?: string;
    };

    let {
        class: className = "",
        multiline = false,
        value = $bindable(),
        ...rest
    }: Props = $props();

    const classes = $derived(
        `glass-panel shadow-inset-subtle w-full rounded-lg px-3 py-[0.55rem] text-white outline-none transition-colors duration-150 ease-out placeholder:text-[#777] focus:border-[#777] focus:bg-white/[0.075] motion-reduce:transition-none ${className}`
    );
</script>

{#if multiline}
    <textarea bind:value class={classes} {...rest}></textarea>
{:else}
    <input bind:value class={classes} {...rest} />
{/if}
