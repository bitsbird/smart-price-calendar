


 export interface SmartPriceCalendar {
  months:SmartPriceMonth[]
 }

 export interface SmartPriceMonth{
  days:SmartPriceDay[]
 }

 export interface SmartPriceDay{
    localeDay:string,
    price:number,
    pricePMS:number,
    HighlightType: 'positive | negative'| null,
  }

 export const ERROR_REASON = [
  'NO_AVAILABLE_MARKET_DATA'
 ] as const;
