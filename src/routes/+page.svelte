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
</div>