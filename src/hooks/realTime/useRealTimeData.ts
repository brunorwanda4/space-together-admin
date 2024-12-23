// import useSWR, { SWRConfiguration } from 'swr';
// import { FetchError } from '@/types/fetchErr';

// const apiClient = new ApiClient();

// export function useRealTimeData<T>(
//   endpoint: string,
//   options?: SWRConfiguration
// ) {
//   // Define a fetcher using the ApiClient
//   const fetcher = async (): Promise<T | FetchError> => {
//     return await apiClient.allData<T>(endpoint);
//   };

//   // Use SWR for real-time fetching
//   const { data, error, isValidating, mutate } = useSWR<T | FetchError>(
//     endpoint,
//     fetcher,
//     {
//       refreshInterval: 5000, // Adjust for polling interval (5 seconds here)
//       ...options,
//     }
//   );

//   // Handle errors in a standard way
//   const isError = !!error || (data && 'message' in data);

//   return {
//     data: !isError ? data : null,
//     error: isError ? (error || data) : null,
//     isValidating,
//     mutate, // Allows manual revalidation
//   };
// }
