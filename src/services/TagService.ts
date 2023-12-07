import type Tag from "@/entities/Tag";

const API_URL = "";

export default {
    async getTags(): Promise<Tag[]> {
        let response = await fetch(`${new URL(document.URL).origin}/api/v1/public/tags`)
        let data = await response.json();
        return data.tag;
    },
};
