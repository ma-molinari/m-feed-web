import Image from "next/image";

import { ItemProps } from "../types";

import ItemFooter from "./ItemFooter";
import ItemHeader from "./ItemHeader";

const Item = ({ data }: ItemProps) => {
  return (
    <div className="rounded-md bg-neutral-900 h-[fit-content]">
      <ItemHeader data={data} />

      {/* IMAGE */}
      <div className="relative h-[300px]">
        <Image
          src={`/assets/feed/mock.jpeg`}
          alt={`Photo by {{ username }}`}
          fill={true}
        />
      </div>

      <ItemFooter data={data} />
    </div>
  );
};

export default Item;
