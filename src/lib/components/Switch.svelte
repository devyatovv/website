<script lang="ts">
    let {
        checked = $bindable(false),
        label
    }: { checked?: boolean; label: string } = $props();
</script>

<button
    class="group relative h-5.5 w-10 shrink-0 cursor-pointer rounded-full border border-black/60 bg-white/5 shadow-sm transition-colors duration-150 ease-out data-[checked=true]:bg-white/15 motion-reduce:transition-none"
    type="button"
    data-checked={checked}
    onclick={() => checked = !checked}
    role="switch"
    aria-checked={checked}
    aria-label={label}
>
    <span
        class="absolute top-0.5 left-0.5 size-4 rounded-full bg-[#777] transition-[left,background-color] duration-150 ease-out group-data-[checked=true]:left-5.25 group-data-[checked=true]:bg-[#d8d8d8] motion-reduce:transition-none"
    ></span>
</button>
