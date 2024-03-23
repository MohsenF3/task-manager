import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

export const formatDate = (date: string) => {
  const newDate = new DateObject({
    date,
    format: "YYYY/MM/DD",
    calendar: persian,
    locale: persian_fa,
  });

  return newDate;
};

export const formatMonthDate = (date: string) => {
  const newDate = formatDate(date);

  return newDate.format("D MMMM YYYY");
};
