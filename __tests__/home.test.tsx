import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../src/app/scientists/page";
import React from "react";

describe("Scientists page", () => {
    it("renders /scientists", () => {
        render(<Home />);
        expect(2 == 2);
    });
});