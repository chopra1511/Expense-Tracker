import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("one", () => {
test("Word Test", () => {
  render(<Navigation />);
  const mail = screen.getByText("HOME");
  expect(mail).toBeInTheDocument();
});
})

describe("two", () => {
  test("Word Test", () => {
    render(<Navigation />);
    const mail = screen.getByText("ABOUT US");
    expect(mail).toBeInTheDocument();
  });
});

describe("three", () => {
  test("Word Test", () => {
    render(<Navigation />);
    const mail = screen.getByText("MyWebLink");
    expect(mail).toBeInTheDocument();
  });
});
