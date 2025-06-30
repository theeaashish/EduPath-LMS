import Logo from "@/public/Logo.svg";
import Image from "next/image";

const MainLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center  bg-[#D4775C]">
        <Image src={Logo} alt="Logo" width={16} height={16} />
      </div>
      <h1 className="text-xl font-semibold">EduPath</h1>
    </div>
  );
};

export default MainLogo;
