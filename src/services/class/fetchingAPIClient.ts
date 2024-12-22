import { FetchError } from "@/types/fetchErr";
import axios, { AxiosResponse } from "axios";

// API Client Class
export class ApiClient {
  private async handleResponse<T>(
    response: AxiosResponse<T>
  ): Promise<T | FetchError> {
    const { data, status, statusText } = response;

    if (status >= 400) {
      return {
        message: statusText || "Error occurred",
        status,
        details: JSON.stringify(data),
      };
    }

    return data;
  }

  async allData<T>(endpoint: string , name ?: string): Promise<T | FetchError> {
    const url = `${process.env.ST_API}/${endpoint}`;
    try {
      const response = await axios.get<T>(url, {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message:
            error.response?.data?.message ||
            `Failed to fetch ${name} status! 😔`,
          status: error.response?.status,
          details: error.message,
        };
      }

      return {
        message: "An unexpected error occurred",
        details: (error as Error).message,
      };
    }
  }
}
