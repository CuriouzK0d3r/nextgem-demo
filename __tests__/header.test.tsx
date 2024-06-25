import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "../src/app/components/header";

export function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Scientists page", () => {
  window.fetch = mockFetch({});

  it("renders footer component", async () => {
    const push = jest.fn();

    const { container } = await act(async () =>
      render(<Header isLoggedIn={true} pageName={"tools"} />),
    );
    const pageTitle = container.querySelector("#page-title");
    expect(pageTitle).toHaveTextContent("tools");
  });
});
