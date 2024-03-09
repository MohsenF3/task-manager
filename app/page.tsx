import LoginForm from "@/components/home/LoginForm";
import { Typography } from "../components/material";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col w-full h-screen ">
      <Typography
        variant="h1"
        color="blue"
        textGradient
        placeholder=""
        className="text-center"
      >
        Welcome To Task Manager Where You Can <br /> Change Your Life
      </Typography>

      <LoginForm />
    </div>
  );
}
