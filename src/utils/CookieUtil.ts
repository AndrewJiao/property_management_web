function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null; // 未找到指定 Cookie
}

/**
 * 设置cookie
 */
function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

export default {getCookie, setCookie}