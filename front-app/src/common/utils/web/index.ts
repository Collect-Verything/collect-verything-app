const URL = "localhost";

const getHeaders = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
};

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const apiRequest = async (portWithServicePath: string, method: HttpMethod, data?: any) => {
    const response = await fetch(`http://${URL}:${portWithServicePath}`, {
        method: method,
        headers: getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error();
    }

    return await response.json();
};

export const apiGet = (path: string) => apiRequest(path, "GET");

export const apiPost = (path: string, data: any) => apiRequest(path, "POST", data);

export const apiPatch = (path: string, data?: any) => apiRequest(path, "PATCH", data);

export const apiDelete = (path: string) => apiRequest(path, "DELETE");

export const throwErrorResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};
