import companyModel from "./companyModel";
import serviceModel from "./serviceModel";

export default interface companyXServiceModel {
  id: number;
  companyId?: number;
  company?: companyModel;
  serviceId?: number;
  service?: serviceModel;
  }