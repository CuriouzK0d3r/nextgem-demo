import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "../src/app/tools/page";
import React from "react";
import { useRouter } from "next/navigation";

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
      route: "/",
      pathname: "",
      query: "",
      asPath: ""
    };
  }
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: ""
    };
  }
}));

describe("Scientists page", () => {
  window.fetch = mockFetch({});

  it("renders /tools", async () => {
    const push = jest.fn();

    const { container } = await act(async () => render(<Home />));
    const pageTitle = container.querySelector("#page-title");
    expect(pageTitle).toHaveTextContent("Tools");
  });
});
