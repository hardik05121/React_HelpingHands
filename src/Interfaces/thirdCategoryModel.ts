import firstCategoryModel from "./firstCategoryModel";
import secondCategoryModel from "./secondCategoryModel";

export default interface thirdCategoryModel {
  id: number
  thirdCategoryName: string
  thirdCategoryImage: string
  firstCategoryId: number
  firstCategory: firstCategoryModel
  secondCategoryId: number
  secondCategory: secondCategoryModel
  isActive: boolean
  }