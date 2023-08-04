import React from "react";

import Container from "./Container";
import Item from "./Item";
import { ItemProps } from "./types";

const Feed = ({ children }: { children: React.ReactNode }) => {
  return React.Children.map(<Container>{children}</Container>, (child) => {
    return React.cloneElement(child);
  });
};

Feed.Item = ({ data }: ItemProps) => <Item data={data} />;

export default Feed;
