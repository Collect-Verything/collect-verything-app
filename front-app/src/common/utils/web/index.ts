// eslint-disable-next-line
export const api = (url: string, method: "POST" | "PATCH" | "GET" | "DELETE", data: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const throwErrorResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};
