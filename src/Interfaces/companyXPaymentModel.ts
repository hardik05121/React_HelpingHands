import companyModel from "./companyModel";
import paymentModel from "./paymentModel";
export default interface companyXPaymentModel {
  id: number;
  companyId?: number;
  company?: companyModel;
  paymentId?: number;
  payment?: paymentModel;
  }