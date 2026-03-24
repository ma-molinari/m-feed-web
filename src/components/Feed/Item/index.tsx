import { forwardRef, memo } from "react";
import Image from "next/image";
import usePostDetails from "@global-stores/usePostDetails";
import { IMAGE_URL } from "@configs/environment";

import ItemFooter from "./ItemFooter";
import ItemHeader from "./ItemHeader";
import { ItemProps } from "../types";

const setPostId = usePostDetails.getState().setId;

const Item = forwardRef<HTMLDivElement, ItemProps>(({ data }, ref) => (
  <div ref={ref} className="border shadow-sm h-[fit-content] w-[32rem]">
    <ItemHeader data={data} />

    {/* IMAGE */}
    <div className="relative h-[32rem]">
      <Image
        src={`${IMAGE_URL}/${data?.image}`}
        alt={`Image by ${data?.user?.username}`}
        className="!w-auto mx-auto cursor-pointer"
        fill
        sizes="32rem"
        priority
        draggable={false}
        onClick={() => setPostId(data?.id)}
      />
    </div>

    <ItemFooter data={data} />
  </div>
));

export default memo(Item);
