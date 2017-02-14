
import { ClientAddressDetModel } from './client-address-det.model';

export class ClientDependentExtModel {

  dependentId: number = 0;
  dependentName: string;
  clientIdType: string;
  clientIdNo: string;
  designation: string;
  clientAddressDet: ClientAddressDetModel;
  directorId : number;
}