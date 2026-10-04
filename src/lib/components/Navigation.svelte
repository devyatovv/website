<script lang="ts">
    import { page } from "$app/state";
    import { cubicOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";

    type NavLink = {
        href: string;
        label: string;
    };

    let {
        activeHref,
        class: className = "mb-12",
        links = [
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" }
        ],
        onselect
    }: { activeHref?: string; class?: string; links?: NavLink[]; onselect?: (href: string) => void } = $props();

    const [send, receive] = crossfade({ duration: 250, easing: cubicOut });

    function isActive(href: string): boolean {
        if (activeHref !== undefined) {
            return activeHref === href;
        }

        if (href !== "/" && page.url.pathname.startsWith(href)) {
            return true;
        }

        return page.url.pathname === href;
    }

    function select(event: MouseEvent, href: string) {
        if (!onselect) {
            return;
        }

        event.preventDefault();
        onselect(href);
    }
</script>

<header class="flex items-center justify-center select-none {className}">
    <nav class="glass-panel shadow-inset-subtle flex gap-1 rounded-full p-1.5" aria-label="Main navigation">
        {#each links as link (link.href)}
            <a
                href={link.href}
                onclick={(event) => select(event, link.href)}
                draggable="false"
                aria-current={isActive(link.href) ? "page" : undefined}
                class="relative rounded-full px-5 py-1.5 transition-colors hover:text-white {isActive(link.href) ? 'text-white' : ''}"
            >   
                {#if isActive(link.href)}
                    <span
                        class="shadow-inset-subtle absolute inset-0 rounded-full bg-white/10"
                        in:receive={{ key: "pill" }}
                        out:send={{ key: "pill" }}
                    ></span>
                {/if}

                <span class="relative">{link.label}</span>
            </a>
        {/each}
    </nav>
</header>