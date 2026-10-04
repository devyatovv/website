<script lang="ts">
    import type { Snippet } from "svelte";
    let { children, class: className = "" }: { children?: Snippet; class?: string } = $props();
</script>

<div class="glass-panel shadow-inset-subtle rounded-xl {className}">
    {@render children?.()}
</div>
