import { FetchError } from "@/types/fetchErr";
import { ApiClient } from "../class/fetchingAPIClient";
import { UserModel } from "@/types/userModel";


export async function fetchUsersByRole(role: string): Promise<UserModel[] | FetchError> {
  const apiClient = new ApiClient();
  const endpoint = `users/rl/${role}`;
  return apiClient.allData<UserModel[]>(endpoint, "users role");
}