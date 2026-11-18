import { CONFIG } from "./config";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./auth";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTokenResponse(value: unknown): value is TokenResponse {
  return (
    isRecord(value) &&
    typeof value.accessToken === "string" &&
    typeof value.refreshToken === "string"
  );
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

let refreshPromise: Promise<string | null> | null = null;

async function readResponseData(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function getErrorMessage(data: unknown, status: number): string {
  if (typeof data === "string" && data.trim()) return data;
  if (isRecord(data)) {
    const body = data;
    const messages = Array.isArray(body.messages)
      ? body.messages
      : Array.isArray(body.message)
      ? body.message
      : null;

    if (messages?.every((message) => typeof message === "string")) {
      return messages.join(", ");
    }
    if (typeof body.message === "string") return body.message;
  }

  return `Request failed with status ${status}.`;
}

async function requestNewAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${CONFIG.API_BASE_URL}/auth/refresh`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await readResponseData(response);

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return null;
    }
    throw new ApiError(getErrorMessage(data, response.status), response.status);
  }

  if (!isTokenResponse(data)) {
    throw new ApiError("The session refresh response was invalid.", 502);
  }

  setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = requestNewAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

function endExpiredSession(): void {
  clearTokens();
  if (
    typeof window !== "undefined" &&
    window.location.pathname !== CONFIG.Routes.LOGIN
  ) {
    window.location.replace(CONFIG.Routes.LOGIN);
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers, ...requestOptions } = options;
  const requestHeaders = (token: string | null) => {
    const result = new Headers(headers);
    if (!result.has("Content-Type")) {
      result.set("Content-Type", "application/json");
    }
    if (requiresAuth && token) {
      result.set("Authorization", `Bearer ${token}`);
    }
    return result;
  };

  const sendRequest = (token: string | null) =>
    fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
      ...requestOptions,
      cache: requestOptions.cache ?? "no-store",
      headers: requestHeaders(token),
    });

  let response = await sendRequest(requiresAuth ? getAccessToken() : null);

  if (requiresAuth && response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (!refreshedToken) {
      endExpiredSession();
      throw new ApiError("Your session has expired. Please sign in again.", 401);
    }

    response = await sendRequest(refreshedToken);
    if (response.status === 401) {
      endExpiredSession();
      throw new ApiError("Your session has expired. Please sign in again.", 401);
    }
  }

  const data = await readResponseData(response);
  if (!response.ok) {
    throw new ApiError(getErrorMessage(data, response.status), response.status);
  }

  return data as T;
}