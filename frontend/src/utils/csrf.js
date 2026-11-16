export function getCsrfToken() {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));

    return cookie
        ? decodeURIComponent(cookie.split('=')[1])
        : null;
}