import {API_BASE, API_FUNCTION_GET_INFO} from '../configuration';

export const function_get_info = async () => {
    // get info
    let url = `${API_BASE}${API_FUNCTION_GET_INFO}`;
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    })
}