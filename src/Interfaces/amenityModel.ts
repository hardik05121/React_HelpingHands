import firstCategoryModel from "./firstCategoryModel"

export default interface amenityModel {
  id: number;
  amenityName: string;
  firstCategoryId?: number;
  firstCategory?: firstCategoryModel;
  isActive?: boolean;
}