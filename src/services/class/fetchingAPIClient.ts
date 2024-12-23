import { FetchError } from "@/types/fetchErr";
import axios, { AxiosResponse, AxiosError } from "axios";

// API Client Class
export class ApiClient {
  private async handleResponse<T>(
    response: AxiosResponse<T>
  ): Promise<T | FetchError> {
    const { data, status } = response;

    if (status >= 400) {
      const errorData = this.isErrorResponse(data)
        ? data
        : { message: "An error occurred." };
      return {
        message: errorData.message,
        status,
        details: JSON.stringify(data),
      };
    }

    return data;
  }

  private async handleError(
    error: AxiosError,
    defaultMessage: string
  ): Promise<FetchError> {
    if (error.response) {
      const { status, data } = error.response;
      let message = `Server responded with error: ${status} - ${error.response.statusText}`;
      if (this.isErrorResponse(data)) {
        message = data.message;
      }
      return {
        message,
        status,
        details: JSON.stringify(data),
      };
    } else if (error.request) {
      return {
        message: `No response received from server. ${defaultMessage}`,
        details: JSON.stringify(error.request), // Add more context here if needed
      };
    } else {
      return {
        message: `Request setup error: ${error.message}`,
        details: error.stack,
      };
    }
  }

  private isErrorResponse(data: unknown): data is { message: string } {
    return typeof data === "object" && data !== null && "message" in data;
  }

  private getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_ST_API || "http://127.0.0.1:2052/api/v0.0.1";
  }

  async allData<T>(endpoint: string, name?: string): Promise<T | FetchError> {
    const url = `${this.getBaseUrl()}/${endpoint}`;
    try {
      const response = await axios.get<T>(url, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(
        error as AxiosError,
        `Failed to fetch ${name} data! 😔`
      );
    }
  }

  async postData<T, R>(
    endpoint: string,
    payload: R,
    name?: string
  ): Promise<T | FetchError> {
    const url = `${this.getBaseUrl()}/${endpoint}`;
    try {
      const response = await axios.post<T>(url, payload);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(
        error as AxiosError,
        `Failed to create ${name}! 😔`
      );
    }
  }

  async updateData<T, R>(
    endpoint: string,
    payload: R,
    name?: string
  ): Promise<T | FetchError> {
    const url = `${this.getBaseUrl()}/${endpoint}`;
    try {
      const response = await axios.put<T>(url, payload);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(
        error as AxiosError,
        `Failed to update ${name}! 😔`
      );
    }
  }

  async deleteData<T>(
    endpoint: string,
    name?: string
  ): Promise<T | FetchError> {
    const url = `${this.getBaseUrl()}/${endpoint}`;
    try {
      const response = await axios.delete<T>(url);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(
        error as AxiosError,
        `Failed to delete ${name}! 😔`
      );
    }
  }
}
