// types/userModel.ts
export interface Gender {
  Male: "M";
  Female: "F";
  Other: "O";
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
  /**
 * id 
 */
  id: string; // id
  rl: string; // role
  co: string; // create date
  uo?: string; // update date
};

export type UserRoleModelNew = {
  rl: string; // role
};
