import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Footer from "./footer";
import React from "react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

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

  it("renders footer component", async () => {
    const push = jest.fn();

    const { container } = await act(async () => render(<Footer />));
    const pageTitle = container.querySelector(
      ".elementor-image-box-description"
    );
    expect(pageTitle).toHaveTextContent(
      "Views and opinions expressed are those of the authors"
    );
  });
});
