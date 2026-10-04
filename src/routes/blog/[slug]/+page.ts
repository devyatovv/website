import { posts } from "#lib/posts/index.js";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) {
        error(404, "Post not found");
    }

    return { post };
};