// types/userModel.ts

export interface Gender {
    Male: 'Male';
    Female: 'Female';
    Other: 'Other';
  }
  
  export interface UserModel {
    id: string;
    rl: string;
    nm: string;
    un?: string;  // optional
    em: string;
    ph?: string;  // optional
    pw?: string;  // optional
    gd?: keyof Gender;  // optional (key of the Gender enum)
    co: string;
  }
  