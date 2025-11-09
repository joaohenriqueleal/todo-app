'use strict';

export default function loadUsers() {
    return JSON.parse(localStorage.getItem('your_tasken_users')) || [];
}
