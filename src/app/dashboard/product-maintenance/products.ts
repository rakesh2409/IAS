export class Products {
  constructor(
      public productId: number,
      public productName: string,
      public productTypeDesc: string,
      public currency: string,
      public state: string,
      public riskRating: number,
      public prodSegmentCd: string,
      public aiProductInd: string,
      public premTypeDesc: string,
      public tenure: number
  ) { }
}
