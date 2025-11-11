"use strict"


export default function loadTasks(username) {
    return JSON.parse(
        localStorage.getItem(`${username}:tasks`)
    ) || []
}
