import firstCategoryModel from "./firstCategoryModel";

export default interface secondCategoryModel {
  id: number
  secondCategoryName: string
  secondCategoryImage: string
  firstCategoryId: number
  firstCategory: firstCategoryModel
  isActive: boolean
  }