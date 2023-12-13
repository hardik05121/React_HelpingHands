import companyModel from "./companyModel";
import amenityModel from "./amenityModel";

export default interface companyXAmenityModel {
  id: number
  amenityId?: number;
  amenity?: amenityModel;
  companyId?: number;
  company?: companyModel;
  }