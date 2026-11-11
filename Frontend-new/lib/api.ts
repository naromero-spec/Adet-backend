import { CONFIG } from './config';
import { getAccessToken } from './auth';

interface fetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

export class ApiError extends Error {
    constructor(message: string, public readonly status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function apiClient<T>
    (Endpoint: string, 
    options: fetchOptions = {}
    ): Promise<T> {
    const { 
        requiresAuth = false,
        headers, 
        ...restOptions } = options;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (requiresAuth) {
        const token = getAccessToken();
        if(token){
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${CONFIG.API_BASE_URL}${Endpoint}`, {
        ...restOptions,
        headers: {
            ...defaultHeaders,
            ...headers
        }
    });

    const data = await response.json();

    if(!response.ok) {
        const errorMessage = Array.isArray(data.messages) ? data.messages.join(', ') : data.message || "An Unexpected error occurred.";
        throw new ApiError(errorMessage, response.status);
    }
    
    return data as T;
}