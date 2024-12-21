import axios from "axios";
import { UserModel } from "@/types/userModel";
import { FetchError } from "@/types/fetchErr";

export const fetchUserData = async (): Promise<UserModel | FetchError | null> => {
  try {
    const res = await axios.get<UserModel>(`${process.env.ST_API}/user/user`, {
      headers: {
        "Cache-Control": "no-store", // Ensures fresh data
      },
    });

    return res.data; // Axios automatically parses JSON
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "Failed to fetch user data",
        status: error.response?.status,
        details: error.message,
      };
    }

    // Fallback for non-Axios errors
    return {
      message: "An unexpected error occurred",
      details: (error as Error).message,
    };
  }
};
