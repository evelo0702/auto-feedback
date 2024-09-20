import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex h-7vh items-center text-xl font-semibold">
      <Link href={"/"}>
        <Image
          src="/logo.png"
          priority
          alt="logo"
          width={80}
          height={80}
          className=""
        />
      </Link>
      <Link href={"/faqs"} className="mx-6">
        FAQS
      </Link>
      <Link href={"/notice"} className="mx-6">
        Notice
      </Link>
      <Link href={"/contact"} className="mx-6">
        Contact
      </Link>
      <Link href={"/register"} className="mx-6">
        Register
      </Link>
    </div>
  );
};

export default Header;
