import { render, screen } from "@testing-library/react";
import Contact from'./Contact';

describe("one", () => {
  test("Contact page Test", () => {
    render(<Contact />);
    const mail = screen.getByText("Contact Details");
    expect(mail).toBeInTheDocument();
  });
});

describe("two", () => {
  test("Contact page  Test", () => {
    render(<Contact />);
    const mail = screen.getByText("Full Name:");
    expect(mail).toBeInTheDocument();
  });
});

describe("three", () => {
  test("Contact page  Test", () => {
    render(<Contact />);
    const mail = screen.getByText("Update");
    expect(mail).toBeInTheDocument();
  });
});
