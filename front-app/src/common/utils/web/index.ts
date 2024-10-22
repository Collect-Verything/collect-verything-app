// eslint-disable-next-line
export const apiPost = (url: string, method: "POST" | "PATCH" | "GET" | "DELETE", data: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
};

export const apiDelete = (url: string, method: "DELETE") => {
    return fetch(`http://localhost:3001/${url}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const apiGet = async (url: string, method: "GET") => {
    const response = await fetch(`http://localhost:3001/${url}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

export const throwErrorResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};
