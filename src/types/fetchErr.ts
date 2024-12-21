export interface FetchError {
    message: string;
    status?: number; // Optional, as not all errors may have a status code
    details?: string; // Additional details (e.g., from the server)
  }
  