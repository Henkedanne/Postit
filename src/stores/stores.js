import { writable } from 'svelte/store';

function post() {
    const { subscribe, set, update } = writable([]);

    let postsArr = []
    return {
        subscribe,
        addPost: (text) => {
            postsArr.push({ text });
            update(() => postsArr)
        },
        reset: () => {
            set([])
            postsArr = []
        }
    }
}

export const posts = post();