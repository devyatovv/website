import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { escapeSvelte, mdsvex } from "mdsvex";
import rehypeKatex from "rehype-katex";
// @ts-expect-error
import remarkMath from "remark-math";
import { bundledLanguages, codeToHtml, type ShikiTransformer } from "shiki";
import { defineConfig } from "vite";

type DiffLineKind = "add" | "remove" | "context";

interface DiffLine {
    kind: DiffLineKind;
    code: string;
}

const shikiOptions = {
    theme: "github-dark",
    colorReplacements: {
        "#24292e": "transparent"
    }
};

function parseDiffLine(line: string): DiffLine {
    if (line.startsWith("+") || line.startsWith("-")) {
        const code = line.slice(1);
        return {
            kind: line[0] === "+" ? "add" : "remove",
            code: code.startsWith(" ") ? code.slice(1) : code
        };
    }

    return { kind: "context", code: line };
}

function parseDiffFence(code: string, lang: string | null | undefined, meta: string | null | undefined) {
    const language = lang?.toLowerCase() ?? "";
    const metaTokens = meta?.trim().split(/\s+/) ?? [];
    let innerLanguage: string | undefined;

    if (language === "diff") {
        const candidate = metaTokens[0];
        if (candidate && !candidate.includes("=")) innerLanguage = candidate;
    } else if (language.startsWith("diff-") || language.startsWith("diff:")) {
        innerLanguage = language.slice("diff-".length);
    } else if (metaTokens.includes("diff")) {
        innerLanguage = language;
    } else {
        return null;
    }

    return {
        language: innerLanguage && innerLanguage in bundledLanguages ? innerLanguage : "text",
        lines: code.split("\n").map(parseDiffLine)
    };
}

async function highlightCode(code: string, lang: string | null | undefined, meta: string | null | undefined) {
    const diff = parseDiffFence(code, lang, meta);

    if (!diff) {
        const html = await codeToHtml(code, {
            lang: lang ?? "text",
            ...shikiOptions
        });

        return `{@html \`${escapeSvelte(html)}\`}`;
    }

    const kinds = diff.lines.map((line) => line.kind);

    const transformer: ShikiTransformer = {
        name: "diff-lines",

        pre(node) {
            this.addClassToHast(node, "diff-block");
        },

        line(node, line) {
            const kind = kinds[line - 1];
            if (kind === "add") this.addClassToHast(node, "diff-add");
            else if (kind === "remove") this.addClassToHast(node, "diff-remove");
        }
    };

    const html = await codeToHtml(
        diff.lines.map((line) => line.code).join("\n"),

        {
            lang: diff.language,
            ...shikiOptions,
            transformers: [transformer]
        }
    );

    return `{@html \`${escapeSvelte(html)}\`}`;
}

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            extensions: [".svelte", ".md"],
            preprocess: [
                mdsvex({
                    extensions: [".md"],
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                    highlight: {
                        highlighter: highlightCode
                    }
                })
            ],
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes("node_modules")
                        ? undefined
                        : true
            },
            adapter: adapter()
        })
    ]
});