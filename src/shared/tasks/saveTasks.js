"use strict"


export default function saveTasks(username, newTasksList) {
    localStorage.setItem(`${username}:tasks`,
        JSON.stringify(newTasksList)
    )
}
