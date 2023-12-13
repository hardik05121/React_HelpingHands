import firstCategoryModel from "./firstCategoryModel"

export default interface userModel {
  password: string;
 // confirmPassword: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string; 
  address?: string;
  email?: string;
}