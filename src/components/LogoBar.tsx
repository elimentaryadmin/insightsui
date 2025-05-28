import Image from 'next/image';

export default function LogoBar() {
  return (
    <Image
      src="/elimentary_logo.png"
      alt="Elimentary"
      width={125}
      height={30}
    />
  );
}
