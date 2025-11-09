'use strict';

export default function saveActualUser(newUser) {
    sessionStorage.setItem('actual_user', newUser);
}
