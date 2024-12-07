"use client";

import { ReactNode, useMemo } from "react";

type TVariant = {
  PRIMARY: ReactNode;
  SECONDARY: ReactNode;
};
const Button = ({
  onClick,
  children,
  variant = "primary",
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const primaryButton = useMemo(
    () => (
      <a
        className="w-full bg-run-800 text-run-50 font-semibold rounded-lg flex items-center justify-center border-2 border-neutral shadow-[1px_1px_0px_2px_black] rounded-lg hover:shadow-[3px_3px_0px_2px_black] p-4"
        onClick={onClick}
      >
        {children}
      </a>
    ),
    [children, onClick]
  );

  const secondaryButton = useMemo(
    () => (
      <a
        className="w-full font-semibold  flex items-center justify-center border-2 border-neutral shadow-[1px_1px_0px_2px_black] rounded-lg hover:shadow-[3px_3px_0px_2px_black] p-4"
        onClick={onClick}
      >
        {children}
      </a>
    ),
    [children, onClick]
  );

  const VARIANT = useMemo(
    () => ({
      PRIMARY: primaryButton,
      SECONDARY: secondaryButton,
    }),
    [primaryButton, secondaryButton]
  );

  const renderButton = useMemo(
    () => VARIANT[variant.toUpperCase() as keyof TVariant],
    [VARIANT, variant]
  );

  return renderButton;
};

export default Button;
