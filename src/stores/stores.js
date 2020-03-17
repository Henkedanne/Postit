import { writable } from 'svelte/store';
import { db } from '../firebase';

let postsArr = []

function post() {
    const { subscribe, set, update } = writable([]);

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

function database() {
    const { subscribe, set, update } = writable('')
    return {
        subscribe,
        saveToDb: () => {
            console.log('save to db!')
        }
    }
}

function userStore() {
    const { subscribe, set, update } = writable('');

    return {
        subscribe,
        setUser: (uid) => {
            update(() => uid)
        },

        removeUser: () => {
            set('');
        }
    }
}
export const posts = post();
export const databaseStore = database();
export const user = userStore();