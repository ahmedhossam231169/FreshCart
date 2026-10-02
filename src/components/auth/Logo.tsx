import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/freshcart-logo.svg"
      alt="FreshCart"
      width={160}
      height={31}
      className="h-8 w-auto"
      priority
    />
  );
}
