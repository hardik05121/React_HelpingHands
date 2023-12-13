import firstCategoryModel from "./firstCategoryModel"

export default interface serviceModel {
  id: number;
  serviceName: string;
  firstCategoryId?: number;
  firstCategory?: firstCategoryModel;
  isActive?: boolean;
  isCheked: boolean;
}