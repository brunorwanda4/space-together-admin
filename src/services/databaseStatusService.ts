import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";
import axios from "axios";

export const fetchDatabaseStatus = async (): Promise<
  DatabaseStats | FetchError | null
> => {
  try {
    const res = await axios.get<DatabaseStats>(
      `${process.env.ST_API}/db/status`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "Failed to fetch user data",
        status: error.response?.status,
        details: error.message,
      };
    }

    return {
      message: "An unexpected error occurred",
      details: (error as Error).message,
    };
  }
};
