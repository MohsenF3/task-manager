"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  DialogFooter,
  DialogHeader,
  Typography,
} from "./material";
import { BeforeInstallPromptEvent } from "@/lib/definition";

export default function PWAModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [promptTriggered, setPromptTriggered] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      setPrompt(beforeInstallPromptEvent);
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setOpen(true);
      }
      setPromptTriggered(true);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };

    if (!promptTriggered) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [promptTriggered]);

  const handleOpen = () => setOpen(!open);

  const handleInstallApp = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then(
        (choiceResult: { outcome: "accepted" | "dismissed" }) => {
          if (choiceResult.outcome === "accepted") {
            // user has installed the PWA
          } else {
            // user dismissed the prompt without installing the PWA
          }

          setOpen(false);
          setPrompt(null);
        }
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        placeholder=""
        className="top-5 right-5 fixed"
      >
        <DialogHeader placeholder="" className="flex flex-col items-start">
          <Typography placeholder="" variant="h4">
            Install The App
          </Typography>
          <Typography placeholder="" variant="small">
            Click below to install the app.
          </Typography>
        </DialogHeader>

        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            onClick={handleOpen}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>

          <Button
            placeholder=""
            variant="gradient"
            color="green"
            onClick={handleInstallApp}
          >
            <span>Install</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
