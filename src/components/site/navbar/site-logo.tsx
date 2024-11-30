import MyImage from "@/components/my-components/myImage";
import React from "react";

const SiteLogo = () => {
  return (
    <div className=" flex gap-2 items-center">
      <MyImage src="/logo/1.png" className=" size-10"/>
     <div className=" flex flex-col">
        <h2  className="font-semibold text-base text-start font-allura flex flex-row"><span>space</span>-<span>together</span></h2>
        <span className="  my-sm-text">admin</span>
     </div>
    </div>
  );
};

export default SiteLogo;
