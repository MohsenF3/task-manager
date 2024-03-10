import Image from "next/image";
import { Input, Button } from "../material";

export default function LoginForm() {
  return (
    <form className="form-container max-w-sm  w-full">
      <Input label="Name" type="text" crossOrigin="" color="purple" />
      <Input label="Email" type="email" crossOrigin="" color="purple" />

      <Button
        variant="gradient"
        fullWidth
        color="purple"
        type="submit"
        placeholder=""
      >
        Enter
      </Button>

      <div className="flex items-center justify-between gap-2 mt-2 mb-6">
        <span className="block w-full bg-gray-200 h-[1px]"></span>
        <span className="font-bold whitespace-nowrap">OR WITH</span>
        <span className="block w-full bg-gray-200 h-[1px]"></span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        <Button
          variant="outlined"
          color="purple"
          placeholder=""
          className="flex items-center gap-2 w-full p-3"
        >
          <Image src="/google.svg" alt="" width={20} height={20} />
          <p className="text-white">Google</p>
        </Button>

        <Button
          variant="outlined"
          placeholder=""
          color="purple"
          className="flex items-center gap-2 w-full p-3"
        >
          <Image
            src="/github.svg"
            alt=""
            width={20}
            height={20}
            className="invert"
          />
          <p className="text-white">Github</p>
        </Button>
      </div>
    </form>
  );
}
