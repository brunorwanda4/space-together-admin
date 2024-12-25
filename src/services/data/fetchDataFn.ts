import { FetchError } from "@/types/fetchErr";
import { ApiClient } from "../class/fetchingAPIClient";
import { UserModel, UserModelDeleteMany, UserModelPut, UserModelUpdateMany, UserRoleModel, UserRoleModelNew } from "@/types/userModel";
import { userSchemeType } from "@/utils/schema/user-schema";

const apiClient = new ApiClient();

/**
 * create user role
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
 * get all users by role
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
 * delete user role
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
 *  Create a new users
 * @param user 
 * @returns UserModel | FetchError
 */
export async function createUserAPI(
  user: userSchemeType
): Promise<UserModel | FetchError> {
  const endpoint = "users";
  return apiClient.postData(endpoint, user, "users");
}

/**
 * delete user
 * @param user 
 * @returns UserModel | FetchError
 */
export async function deleteUserAPI(
  id: string
): Promise<UserModel | FetchError> {
  const endpoint = `users/${id}`;
  return apiClient.deleteData(endpoint, "users");
}

/**
 * delete many user
 * @param user 
 * @returns UserModel[] | FetchError
 */

export async function deleteManyUsersAPI(
  users: UserModelDeleteMany
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/delete-many`;
  return apiClient.postData(endpoint,users, "users");
}


/**
 * delete many user
 * @param user 
 * @returns UserModel[] | FetchError
 */

export async function updateManyUsersAPI(
  users: UserModelUpdateMany
): Promise<UserModel[] | FetchError> {
  const endpoint = `users/update-many`;
  return apiClient.postData(endpoint,users, "users");
}


/**
 * delete user
 * @param user 
 * @returns UserModel | FetchError
 */
export async function updateUserAPI(
  user : UserModelPut,
  id: string,
): Promise<UserModel | FetchError> {
  const endpoint = `users/${id}`;
  return apiClient.updateData(endpoint,user, "users");
}

/**
 * get document by id
 * @returns T | FetchError
 */

export async function fetchDocumentById<T>(
  endpoint: string,
  name ?: string
): Promise<T | FetchError> {
  return apiClient.allData<T>(endpoint, name);
}

/**
 * get all user roles
 * @returns UserRoles[] | FetchError
 */

export async function fetchAllUserRoles(): Promise<UserRoleModel[] | FetchError> {
  const endpoint = "users/role";
  return apiClient.allData<UserRoleModel[]>(endpoint, "user roles");
}