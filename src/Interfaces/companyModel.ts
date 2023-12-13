import cityModel from "./cityModel";
import countryModel from "./countryModel";
import firstCategoryModel from "./firstCategoryModel";
import secondCategoryModel from "./secondCategoryModel";
import thirdCategoryModel from "./thirdCategoryModel";
import stateModel from "./stateModel";

export default interface companyModel {
  id: number;
  companyName: string;
  companyLogo?: string;
  firstCategoryId?: number;
  firstCategory?: firstCategoryModel;
  secondCategoryId?: number;
  secondCategory?: secondCategoryModel;
  thirdCategoryId?: number;
  thirdCategory?: thirdCategoryModel;
  cityId?: number;
  city?: cityModel;
  stateId?: number;
  state?: stateModel;
  countryId?: number;
  country?: countryModel;
  address?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  certificate?: string;
  isDelete?: any;
  isActive?: boolean;
  whatsApp?: string;
  instagramId?: string;
  facebook?: string;
  website?: string;
  twitter?: string;
  createdDate?: any;
  updatedDate?: string;
  establishDate?: string;
  }