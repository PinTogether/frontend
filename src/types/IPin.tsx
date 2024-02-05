export default interface IPin {
  id: number;
  serviceId: string;
  localCode: number;
  localManageCode: string;
  statusNumber: number;
  status: string;
  phone: string;
  zipCode: string;
  roadNumberAddress: string;
  roadNameAddress: string;
  roadZipCode: string;
  placeName: string;
  category: string;
  x: number;
  y: number;
  comment: string;
}
