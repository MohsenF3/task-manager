import { Spinner } from "./material";

export function Loader() {
  return (
    <div className="h-[calc(100vh-23vh)] flex items-center justify-center">
      <Spinner className="h-16 w-16 " color="indigo" />
    </div>
  );
}
