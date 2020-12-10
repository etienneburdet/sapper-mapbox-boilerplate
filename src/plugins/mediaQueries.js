import watchMedia from "svelte-media";

const mediaqueries = {
    mobile: "(max-width: 769px)"
};

export const media = watchMedia(mediaqueries);