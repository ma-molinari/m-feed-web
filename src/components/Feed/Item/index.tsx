import { forwardRef, memo } from "react";
import Image from "next/image";

import { ItemProps } from "../types";

import ItemFooter from "./ItemFooter";
import ItemHeader from "./ItemHeader";

const Item = forwardRef<HTMLDivElement, ItemProps>(({ data }, ref) => (
  <div
    ref={ref}
    className="rounded-md border shadow-sm h-[fit-content] w-[32rem]"
  >
    <ItemHeader data={data} />

    {/* IMAGE */}
    <div className="relative h-[32rem]">
      <Image
        src={`/assets/feed/mock.jpeg`}
        alt={`Photo by ${data?.user?.username}`}
        fill
        sizes="32rem"
        priority
      />
    </div>

    <ItemFooter data={data} />
  </div>
));

export default memo(Item);
