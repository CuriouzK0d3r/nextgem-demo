import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "../src/app/scientists/page";
import React from "react";
export function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe("Scientists page", () => {
  window.fetch = mockFetch({});

  it("renders /scientists", async () => {
    await act(async () => render(<Home />));
  });
});
