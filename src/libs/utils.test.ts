import { describe, expect, it } from "vitest";

import { getNextPageParam } from "./utils";

describe(`getNextPageParam`, () => {
  it(`returns undefined when all items are loaded`, () => {
    const lastPage = { data: [{ id: 1 }], ct: 1 };
    const allPages = [lastPage];
    expect(getNextPageParam(lastPage, allPages)).toBeUndefined();
  });

  it(`returns next page index when more items exist`, () => {
    const page0 = { data: [{ id: 1 }], ct: 3 };
    const page1 = { data: [{ id: 2 }], ct: 3 };
    const allPages = [page0, page1];
    expect(getNextPageParam(page1, allPages)).toBe(2);
  });
});
