export const httpGetRequest = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export const httpDeleteRequest = async (url) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
}

export const httpPostRequest = async (apiUrl, productUrl) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ url: productUrl})
    };

    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();
    return result;
}