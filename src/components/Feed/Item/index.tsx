import Image from "next/image";
import { memo } from "react";

import { ItemProps } from "../types";

import ItemFooter from "./ItemFooter";
import ItemHeader from "./ItemHeader";

const Item = ({ data }: ItemProps) => {
  return (
    <div className="rounded-md border shadow-sm h-[fit-content] w-[32rem]">
      <ItemHeader data={data} />

      {/* IMAGE */}
      <div className="relative h-[500px]">
        <Image
          src={`/assets/feed/mock.jpeg`}
          alt={`Photo by ${data?.user?.username}`}
          fill={true}
        />
      </div>

      <ItemFooter data={data} />
    </div>
  );
};

export default memo(Item);
