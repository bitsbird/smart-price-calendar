import { useQuery } from "@tanstack/react-query";
import { getPrices, getSettings } from "../../utils/api";
import { SmartPriceCalendar, SmartPriceDay, SmartPriceMonth } from './types';
import { getDay, getMonth, isSameMonth } from 'date-fns';
import { PriceDataForDayRoom } from '../../../types';
const Calendar = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
  });

  

   const { data:settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading) {
    return <div>Loading prices...</div>;
  }

  if (error) {
    return <div>Failed to load prices.</div>;
  }
  
  //const selectedMonth = getMonth(new Date());

interface CalendarDay{
  date:Date,
    price:number,
    pricePMS:number,
}

 
  console.log(data.prices.data);

 
  

  return (
    <div className="flex flex-wrap border-t border-l">
      <h2>Calendar</h2>
      <h3>switch month**</h3>
      <h3>switch Room***</h3>
      
    </div>

  );

};

export { Calendar };