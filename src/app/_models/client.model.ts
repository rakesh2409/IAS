import { ClientAddressDetModel } from './client-address-det.model';

import { ClientExtModel } from './client-ext.model';

export class ClientModel {

  clientId: number = 0;
  
  clientExt: ClientExtModel;
  clientAddressDet: Array<any>;
  clientDependentExtDTO: Array<any>;
  
  beneownerId: number = 0;
  clientAdviceInd: string = null;
  clientAiExpiryDt: Date = null;//date
  clientAiInceptionDt: Date = null; //date
  clientAiInd: boolean = false;
  clientBlacklistInd: boolean = false;
  clientCategoryInd: number = 0;
  clientCifNo: string = null;
  clientCkaOutcome1Ind: boolean = false;
  clientCkaOutcome2Ind: boolean = false;
  clientCkaOutcome3Ind: boolean = false;
  clientCompanyName: string = null;
  clientConstInd: boolean = false;
  clientEduAboveInd: boolean = false;
  clientEducationId: number = 0;
  clientEmploymentId: number = 0;
  clientEngProficiencyInd: boolean = false;
  clientFullname: string = null;
  clientGenderId: number = 0;
  clientHomeId: string = null;
  clientIdType: string = null;
  clientIdNo: string = null;
  clientInvexpgrpAInd: boolean = false;
  clientInvexpgrpBInd: boolean = false;
  clientMailingAddId: number = 0;
  clientMaritalId: string = null;
  clientMobileId: string = null;
  clientNationalityDesc: string = null;
  clientNationalityId: number = 0;
  clientOccupation: string = null;
  clientOfficeId: string = null;
  clientPepInd: boolean = false;
  clientPreviousCompanyName: string = null;
  clientPreviousOccupation: string = null;
  clientPwInd: string = null;
  clientRelationshipId: number = 0;
  clientResidentialAddId: number = 0;
  clientSalutationId: string = null;
  clientTrustedId: number = 0;
  clientTrustedInd: boolean = false;
  clientTypeInd: number = 0;
  clientUsInd: boolean = false;
  clientWork3roleInd: boolean = false;
  dependentId: number = 0;
  trustedRelationhipId: number = 0;
  clientActiveInd: boolean = false;
  clientEmploymentStatus: string = null;
  clientGenderDesc : string = null;
  clientTypeIndDesc : string = null;
  clientAiIndDesc : string = null;
  clientUsIndDesc : string = null; 
  clientBlacklistIndDesc : string = null;
  clientAdviceIndDesc : string = null;
}