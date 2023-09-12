import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/templates/Home";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Home Component", () => {
  it("calls signIn when the button is clicked", () => {
    render(<Home />);

    const button = screen.getByText("Google log in");

    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("renders a welcome message", () => {
    render(<Home />);

    const welcomeMessage = screen.getByText("Welcome to the login page!");

    expect(welcomeMessage).toBeInTheDocument();
  });
});
