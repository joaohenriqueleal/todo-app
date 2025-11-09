'use strict';

export default function saveUsers(newUsersList) {
    localStorage.setItem('your_tasken_users', JSON.stringify(newUsersList));
}
