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
  gd?: keyof Gender; // gender
  co: string; // create date
  uo?: string; // update date
}

export type UserRoleModel = {
  id: string; // id
  rl: string; // role
  co: string; // create date
  uo?: string; // update date
};

export type UserRoleModelNew = {
  rl: string; // role
};
