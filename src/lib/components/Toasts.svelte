<script lang="ts">
    import { toasts } from "#lib/toast.svelte.js";
    import { fly } from "svelte/transition";
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col-reverse items-end gap-2">
    {#each toasts as entry (entry.id)}
        <div
            transition:fly={{ x: 24, duration: 200 }}
            class="glass-panel shadow-inset-medium rounded-lg px-4 py-3 text-white backdrop-blur"
        >
            {entry.message}
        </div>
    {/each}
</div>