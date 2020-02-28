import { writable } from 'svelte/store';

function post() {
    const { subscribe, set, update } = writable([]);

    let postsArr = []
    return {
        subscribe,
        addPost: (text, id) => {
            postsArr.push({ text, id });
            update(() => postsArr)
        },
        removePost: (id) => {
            const filter = postsArr.filter((post) => {
                return post.id !== id;
            })
            postsArr = filter
            update(() => postsArr)
        },
        reset: () => {
            set([])
            postsArr = []
        }
    }
}

export const posts = post();