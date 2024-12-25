// types/userModel.ts

export interface Gender {
  Male: "M"; // Male gender representation
  Female: "F"; // Female gender representation
  Other: "O"; // Other gender representation
}

export interface UserModelNew {
  nm: string; // Full name of the user
  un?: string; // Username (optional)
  rl: string; // Role ID associated with the user
  em: string; // Email address of the user
  ph?: string; // Phone number (optional)
  im ?: string; // Image
  pw: string; // Password for the user account
  gd: keyof Gender; // Gender of the user, refers to the Gender interface
}

export interface UserModel {
  id: string; // id
  rl: string; // role id
  nm: string; // name
  un?: string; // username
  em: string; // email
  ph?: string; // phone number
  pw?: string; // password
  ds ?: boolean; // disabled status 
  gd?: keyof Gender; // gender
  co: string; // create date
  uo?: string; // update date
  im ?: string; // Image
}

export interface UserModelPut {
  rl?: string; // Role
  un?: string; // Username
  nm?: string; // Name
  em?: string; // Email
  ph?: string; // Phone
  pw?: string; // Password
  gd?: Gender; // Gender
  ds?: boolean; // Disabled status
  im ?: string; // Image 
}

export interface UserModelDeleteMany {
  users : string[]; // Array of user ids
}

export interface UserModelUpdate {
  id: string; // id
  user: UserModelPut; // user object
}
export interface UserModelUpdateMany {
  users : UserModelUpdate[]; // Array of user ids
}

// user role model
export type UserRoleModel = {
  id: string; // id
  rl: string; // role
  co: string; // create date
  uo?: string; // update date
};

export type UserRoleModelNew = {
  rl: string; // role
};
