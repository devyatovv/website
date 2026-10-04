<script lang="ts">
    import { onMount } from "svelte";

    type Option = {
        label: string;
        value: string;
    };

    let {
        disabled = false,
        label,
        name,
        options,
        value = $bindable()
    }: {
        disabled?: boolean;
        label: string;
        name?: string;
        options: Option[];
        value?: string;
    } = $props();

    let open = $state(false);
    let root: HTMLDivElement;
    let trigger: HTMLButtonElement;

    const selectedIndex = $derived(Math.max(0, options.findIndex((option) => option.value === value)));
    const selected = $derived(options[selectedIndex]);

    onMount(() => {
        function closeOnOutsideClick(event: PointerEvent) {
            if (!root.contains(event.target as Node)) {
                open = false;
            }
        }

        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
    });

    function focusOption(index: number) {
        queueMicrotask(() => root.querySelectorAll<HTMLButtonElement>("[role=option]")[index]?.focus());
    }

    function showOptions() {
        if (disabled || options.length === 0) {
            return;
        }

        open = true;
        focusOption(selectedIndex);
    }

    function choose(option: Option) {
        value = option.value;
        open = false;
        trigger.focus();
    }

    function handleTriggerKeydown(event: KeyboardEvent) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showOptions();
        }
    }

    function handleOptionKeydown(event: KeyboardEvent, index: number) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusOption((index + 1) % options.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusOption((index - 1 + options.length) % options.length);
        } else if (event.key === "Home") {
            event.preventDefault();
            focusOption(0);
        } else if (event.key === "End") {
            event.preventDefault();
            focusOption(options.length - 1);
        } else if (event.key === "Escape") {
            event.preventDefault();
            open = false;
            trigger.focus();
        }
    }
</script>

<div class="relative w-full" bind:this={root}>
    {#if name}
        <input type="hidden" {name} {value} />
    {/if}

    <button
        class="glass-panel shadow-inset-subtle group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-[0.55rem] text-left text-white outline-none transition-colors duration-150 ease-out hover:bg-white/[0.075] focus-visible:border-[#777] data-[open=true]:border-[#777] data-[open=true]:bg-white/[0.075] disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"
        type="button"
        {disabled}
        data-open={open}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        bind:this={trigger}
        onclick={() => open ? open = false : showOptions()}
        onkeydown={handleTriggerKeydown}
    >
        <span>{selected?.label ?? "Select an option"}</span>
        <svg
            class="w-4 shrink-0 fill-none stroke-[#999] stroke-[1.5] transition-transform duration-150 ease-out [stroke-linecap:round] [stroke-linejoin:round] group-data-[open=true]:rotate-180 motion-reduce:transition-none"
            viewBox="0 0 16 16"
            aria-hidden="true"
        >
            <path d="m4 6 4 4 4-4"></path>
        </svg>
    </button>

    {#if open}
        <div
            class="glass-panel shadow-inset-subtle absolute top-[calc(100%+0.375rem)] right-0 left-0 z-20 flex flex-col gap-0.5 rounded-lg p-1"
            role="listbox"
            aria-label={label}
        >
            {#each options as option, index (option.value)}
                <button
                    class="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-[0.45rem] text-left text-[#aaa] outline-none hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white aria-selected:bg-white/6 aria-selected:text-white"
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onclick={() => choose(option)}
                    onkeydown={(event) => handleOptionKeydown(event, index)}
                >
                    <span>{option.label}</span>
                    {#if option.value === value}
                        <svg
                            class="w-3.5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="m3.5 8 3 3 6-6"></path>
                        </svg>
                    {/if}
                </button>
            {/each}
        </div>
    {/if}
</div>
