<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import dockerLogo from "$lib/assets/tech/docker.svg";
    import javaLogo from "$lib/assets/tech/java.svg";
    import kotlinLogo from "$lib/assets/tech/kotlin.svg";
    import pythonLogo from "$lib/assets/tech/python.svg";
    import pytorchLogo from "$lib/assets/tech/pytorch.svg";
    import svelteLogo from "$lib/assets/tech/svelte.svg";
    import tailwindLogo from "$lib/assets/tech/tailwindcss.svg";
    import typescriptLogo from "$lib/assets/tech/typescript.svg";
    import Button from "$lib/components/Button.svelte";
    import { toast } from "$lib/toast.svelte";

    const technologies = [
        { name: "Python", image: pythonLogo },
        { name: "TypeScript", image: typescriptLogo },
        { name: "Kotlin", image: kotlinLogo },
        { name: "Java", image: javaLogo },
        { name: "Svelte", image: svelteLogo },
        { name: "Tailwind", image: tailwindLogo },
        { name: "Docker", image: dockerLogo },
        { name: "PyTorch", image: pytorchLogo }
    ];

    const encodedEmail = [113, 71, 33, 13, 105, 13, 38, 4, 119, 89, 94, 42, 18, 107, 12, 27, 29, 119, 88, 49, 27, 57, 85, 58, 25];

    function getAge(birthDate: Date): number {
        const today = new Date();
        const isBeforeBirthday =
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

        return today.getFullYear() - birthDate.getFullYear() - (isBeforeBirthday ? 1 : 0);
    }

    const age = getAge(new Date("2008-08-15"));

    async function copyEmail(event: MouseEvent) {
        if (!event.isTrusted) {
            return;
        }

        const email = String.fromCharCode(
            ...encodedEmail.map((byte, index) => byte ^ ((index * 31 + 7) % 127))
        );

        await navigator.clipboard.writeText(email);
        toast("Copied email address to clipboard");
    }
</script>

<svelte:head>
    <title>devyatovv.com</title>
</svelte:head>

<div class="flex flex-col gap-4 text-lg pop-in-container">
    <h1 class="text-3xl font-bold text-white">Vadim Devyatov</h1>
    <p>{age}-year-old developer from Colorado</p>

    <h2 class="mt-2 text-xl font-bold text-white">Links</h2>

    <div class="flex flex-wrap gap-2">
        <Button href="https://github.com/devyatovv">GitHub</Button>
        <Button href="https://www.linkedin.com/in/devyatovv">LinkedIn</Button>
        <Button onclick={copyEmail}>Email</Button>
    </div>

    <h2 class="mt-2 text-xl font-bold text-white">Technologies</h2>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {#each technologies as technology (technology.name)}
            <Card class="flex items-center gap-3 p-4">
                <img src={technology.image} alt="" class="size-8 shrink-0 select-none" />
                <span class="text-white">{technology.name}</span>
            </Card>
        {/each}
    </div>
<<<<<<< Updated upstream

    <h2 class="mt-2 text-xl font-bold text-white">Projects</h2>

    <Card class="flex items-center gap-4 p-5">
        <img src="/monolith.svg" alt="" class="size-10 shrink-0" />

        <div class="flex flex-col">
            <span class="text-lg text-white">Monolith</span>
            <span class="text-sm">Local AI studio</span>
        </div>

        <a
            href="https://github.com/devyatovv/monolith"
            aria-label="Monolith on GitHub"
            class="ml-auto transition ease-out hover:scale-115 active:scale-95"
        >
            <svg viewBox="0 0 24 24" class="size-6 fill-white">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
        </a>
    </Card>
</div>
=======
</div>
>>>>>>> Stashed changes
