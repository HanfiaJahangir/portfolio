"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VehicleInputState } from "@/components/demos/bike-drift/types";

const initialInput: VehicleInputState = {
  accelerate: false,
  brake: false,
  left: false,
  right: false,
  drift: false
};

function mapKeyToInput(key: string): keyof VehicleInputState | null {
  switch (key.toLowerCase()) {
    case "w":
    case "arrowup":
      return "accelerate";
    case "s":
    case "arrowdown":
      return "brake";
    case "a":
    case "arrowleft":
      return "left";
    case "d":
    case "arrowright":
      return "right";
    case " ":
      return "drift";
    default:
      return null;
  }
}

export function useVehicleInput() {
  const inputRef = useRef<VehicleInputState>({ ...initialInput });
  const [, forceUpdate] = useState(0);

  const setInput = useCallback((key: keyof VehicleInputState, value: boolean) => {
    inputRef.current[key] = value;
    forceUpdate((state) => state + 1);
  }, []);

  const resetInput = useCallback(() => {
    inputRef.current = { ...initialInput };
    forceUpdate((state) => state + 1);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent, value: boolean) => {
      const inputKey = mapKeyToInput(event.key);

      if (!inputKey) {
        return;
      }

      event.preventDefault();
      setInput(inputKey, value);
    };

    const handleKeyDown = (event: KeyboardEvent) => handleKey(event, true);
    const handleKeyUp = (event: KeyboardEvent) => handleKey(event, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", resetInput);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", resetInput);
    };
  }, [resetInput, setInput]);

  return {
    input: inputRef.current,
    inputRef,
    setInput,
    resetInput
  };
}
