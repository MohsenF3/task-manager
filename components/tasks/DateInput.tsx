"use client";

import { Control, Controller } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { useTheme } from "next-themes";
import { Input } from "../material";
import { ModalFormFields } from "@/lib/definition";
const transition = require("react-element-popper/animations/transition");
const opacity = require("react-element-popper/animations/opacity");

export default function DateInput({
  control,
}: {
  control: Control<ModalFormFields>;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <Controller
      name="date"
      control={control}
      render={({ field }: any) => (
        <DatePicker
          format="YYYY/MM/DD"
          calendar={persian}
          className={`${
            resolvedTheme === "dark" && "bg-dark"
          } !font-medium green`}
          locale={persian_fa}
          calendarPosition="bottom-right"
          render={<CustomInput />}
          mapDays={({ date }) => {
            let props = { className: "" };
            let isWeekend = date.weekDay.index === 6;

            if (isWeekend) props.className = "highlight highlight-red";

            return props;
          }}
          // remove the arrow
          arrow={false}
          // unable the user to change the date in input
          editable={false}
          // show animation
          animations={[
            opacity(),
            transition({
              from: 40,
              transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
            }),
          ]}
          style={{
            width: "100%",
          }}
          containerStyle={{
            width: "100%",
          }}
          {...field}
        />
      )}
    />
  );
}

function CustomInput({ onFocus, value, onChange }: any) {
  return (
    <Input
      label="تاریخ"
      crossOrigin=""
      labelProps={{
        className: "dark:!text-white !font-bold",
      }}
      variant="standard"
      className="dark:text-white dark:placeholder:text-white"
      onFocus={onFocus}
      value={value}
      onChange={onChange}
    />
  );
}
