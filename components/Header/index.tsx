import React from "react";
import Link from "next/link";

export default function Index() {
  return (
    <div className="[border-bottom:1px_solid_#e2e2e2] bg-[#407bff] text-[white] flex justify-center items-center">
    <div className="max-w-6xl w-full p-[1rem] flex justify-between items-center">
        <Link href={"/"}>
      <h1 className="text-[25px] font-bold">Bloocode Movie</h1>
        </Link>
        
      <Link href={"/favorite"}>
      <button className="bg-[white] text-[#407bff] px-[20px] py-[7px] rounded-[3px] font-semibold">Favorite</button>
      </Link>
    </div>
    </div>
  );
}


// 1e860b8aae25776b27ca5a96dbe26c33

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTg2MGI4YWFlMjU3NzZiMjdjYTVhOTZkYmUyNmMzMyIsIm5iZiI6MTczMTkzNDk5MC45NjA3MjY3LCJzdWIiOiI2NzNiMWM2MTczYTQ1ZTUxODRiZmE0YTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7-BptNNuX9kdBgWN6-yXb-pDRYcnOxRf36zXs2o4s8s