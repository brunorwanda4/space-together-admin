import { ObjectId } from "mongoose";

export interface TSchool extends Document {
    _id : string
    name: string;
    username: string;
    logo: string;
    country: string;
    province: string;
    city: string;
    email: string;
    websiteURL: string;
    phoneNumber: string;
    type: string[];
    description: string;
    createdBy: ObjectId;
    classes: ObjectId[];
    students: ObjectId[];
    teachers: ObjectId[];
    headerTeacher: ObjectId;
    facebook ?: string;
    twitter ?: string;
    whatsapp ?: string;
    createdAt?: Date;
    updatedAt?: Date;
    database ?: string;
  }
  