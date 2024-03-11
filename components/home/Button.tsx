import Image from "next/image";
import { Button } from "../material";

import { handleGithubLogin, handleGoogleLogin } from "@/lib/actions";

export const GithubButton = () => {
  return (
    <form action={handleGithubLogin} className="w-full">
      <Button
        variant="outlined"
        placeholder=""
        color="purple"
        className="flex items-center  justify-center md:justify-start gap-2 w-full p-3"
        type="submit"
      >
        <Image
          src="/github.svg"
          alt="Github Icon"
          width={20}
          height={20}
          className="invert"
        />
        <p className="text-white">Github</p>
      </Button>
    </form>
  );
};

export const GoogleButton = () => {
  return (
    <form action={handleGoogleLogin} className="w-full">
      <Button
        variant="outlined"
        color="purple"
        placeholder=""
        className="flex items-center justify-center md:justify-start gap-2 w-full p-3"
        type="submit"
      >
        <Image src="/google.svg" alt="Google Icon" width={20} height={20} />
        <p className="text-white">Google</p>
      </Button>
    </form>
  );
};
