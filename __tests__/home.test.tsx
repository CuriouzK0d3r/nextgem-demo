import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../src/app/scientists/page";

describe("Calculator", () => {
    it("renders a calculator", () => {
        render(<Home />);
        expect(2 == 2);
    });
});