const URL = process.env.REACT_APP_DOMAIN;

const getHeaders = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
};

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const apiRequest = async (portWithServicePath: string, method: HttpMethod, data?: unknown) => {
    const response = await fetch(`http://${URL}:${portWithServicePath}`, {
        method: method,
        headers: getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
    });

    // await throwErrorResponse(response)
    if (!response.ok) {
        throw new Error(String(response.status));
    }

    return await response.json();
};

export const apiGet = (path: string) => apiRequest(path, "GET");

export const apiPost = (path: string, data: unknown) => apiRequest(path, "POST", data);

export const apiPatch = (path: string, data?: unknown) => apiRequest(path, "PATCH", data);

export const apiDelete = (path: string) => apiRequest(path, "DELETE");

export const throwErrorResponse = async (res: Response) => {
    if (!res.ok) {
        throw new Error(String(res.status));
    }
    return await res.json();
};
