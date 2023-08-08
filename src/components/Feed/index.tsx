import React from "react";

import Container from "./Container";
import Item from "./Item";
import { ItemProps, ComponentProps } from "./types";

const Feed = ({ children }: { children: React.ReactNode }) => {
  return React.Children.map(<>{children}</>, (child) => {
    return React.cloneElement(child);
  });
};

Feed.Container = ({ children }: ComponentProps) => (
  <Container>{children}</Container>
);

Feed.Item = ({ data }: ItemProps) => <Item data={data} />;

export default Feed;
