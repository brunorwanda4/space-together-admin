import { TSchool } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const SchoolSchema: Schema = new Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [4, "Minimum character length is 4"],
      maxlength: [25, "Maximum character length is 25 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [1, "Minimum character length is 1"],
      maxlength: [50, "Maximum character length is 50 characters"],
      unique: [true, "Username must be unique"],
    },
    logo: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    province: {
      type: String,
      required: [true, "Province is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
    },
    websiteURL: {
      type: String,
      match: [/^(https?:\/\/)?([\da-z.-]+\.)+[a-z]{2,}$/, "Website URL is invalid"],
    },
    twitter : {
      type : String,
      required: [false, "Twitter is not required"],
      maxlength: [255, "Maximum character length is 23"],
    },
    facebook : {
      type : String,
      required: [false, "facebook is not required"],
      maxlength: [255, "Maximum character length is 23"],
    },
    whatsapp : {
      type : String,
      required: [false, "whatsapp is not required"],
      maxlength: [255, "Maximum character length is 23"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter a valid phone number"],
      minlength: [10, "Minimum character length is 10"],
      maxlength: [23, "Maximum character length is 23"],
      unique: true,
    },
    type: {
      type: [String],
      enum: ["online", "primary", "middle", "vocational", "homeschooling", "boarding", "TVET", "high", "international"],
      required: [true, "Type of school is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Minimum character length is 10"],
      maxlength: [255, "Maximum character length is 255"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "CreatedBy is required"],
    },
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    }],
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }],
    teachers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }],
    headerTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  }, { timestamps: true });
  
  const School: Model<TSchool> = mongoose.models.School || mongoose.model<TSchool>("School", SchoolSchema);
  
  export default School;