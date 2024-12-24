import { FetchError } from "@/types/fetchErr";
import { ApiClient } from "../class/fetchingAPIClient";
import { UserModel, UserRoleModel, UserRoleModelNew } from "@/types/userModel";
import { userSchemeType } from "@/utils/schema/user-schema";

const apiClient = new ApiClient();

/**
 * 
 * @param role 
 * @returns UserRoleModel | FetchError
 */
export async function createUserRole(
  role: UserRoleModelNew
): Promise<UserRoleModel | FetchError> {
  const endpoint = "users/role";
  return apiClient.postData(endpoint, role, "user role");
}

/**
 * 
 * @param role 
 * @returns UserModel[] | FetchError
 */
export async function fetchUsersByRole(
  role: string
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/rl/${role}`;
  return apiClient.allData<UserModel[]>(endpoint, "users role");
}

/**
 * 
 * @param id 
 * @returns UserRoleModel | FetchError
 */
export async function usersByRoleDelete(
  id: string
): Promise<UserRoleModel | FetchError> {
  const endpoint = `users/role/${id}`;
  return apiClient.deleteData<UserRoleModel>(endpoint, "users role");
}

/**
 * 
 * @param user 
 * @returns UserModel | FetchError
 */
export async function createUserAPI(
  user: userSchemeType
): Promise<UserModel | FetchError> {
  const endpoint = "users";
  return apiClient.postData(endpoint, user, "users");
}
