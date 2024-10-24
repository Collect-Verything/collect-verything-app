export const apiPost = (url: string, data: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
};

export const apiDelete = (url: string) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
};

export const apiGet = async (url: string) => {
    const response = await fetch(`http://localhost:3001/${url}`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

export const apiPatch = (url: string, data: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
};

export const throwErrorResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};

const getHeaders = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
};
