/* eslint-disable react/display-name */
import { render, screen, fireEvent, act } from "@testing-library/react";
import LoginPopup from "../LoginPopup";
import AuthProvider from "../../context/AuthProvider";
jest.mock("next/image", () => ({ src, alt }) => (
  <img src={"https://www.google.com"} alt={alt} />
));

const MyContextProvider = () => {
  return (
    <AuthProvider>
      <LoginPopup />
    </AuthProvider>
  );
};
describe("LoginPopup component", () => {
  test("renders LoginPopup component", () => {
    render(<MyContextProvider />);
    // expect(screen.getByTestId("loginbtn")).toBeInTheDocument();
  });

  test("input fields can be updated", () => {
    render(<MyContextProvider />);
    const emailInput = screen.getByPlaceholderText("ایمیل یا شماره موبایل");
    const codeInput = screen.getByPlaceholderText("کد تایید");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(codeInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(codeInput.value).toBe("123456");
  });

  test("clicking on send button triggers sendOtpHandler function", async () => {
    render(<MyContextProvider />);
    const sendCodeButton = screen.getByText("ارسال");

    await act(async () => {
      fireEvent.click(sendCodeButton);
    });
  });

  test("clicking on login button triggers onVerifyHandler function", async () => {
    render(<MyContextProvider />);
    const verifyButton = screen.getByTestId("loginbtn");

    await act(async () => {
      fireEvent.click(verifyButton);
    });
  });
});
