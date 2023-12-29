import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Popup from "../Popup";

describe("Popup component", () => {
  test("renders Popup component with contact information", () => {
    render(
      <Popup
        phone="09030335008"
        setShow={() => {}}
        telegram_id="test_telegram"
      />
    );
    expect(screen.getByText("09030335008")).toBeInTheDocument();
    expect(screen.getByText("test_telegram")).toBeInTheDocument();
  });

  test("renders Popup component without phone number", () => {
    render(<Popup setShow={() => {}} telegram_id="test_telegram" />);
    expect(screen.getByText("test_telegram")).toBeInTheDocument();
  });

  test("renders Popup component without telegram id", () => {
    render(<Popup phone="09030335008" setShow={() => {}} />);

    expect(screen.getByText("اطلاعات تماس")).toBeInTheDocument();
    expect(screen.getByText("شماره تماس")).toBeInTheDocument();
    expect(screen.getByText("09030335008")).toBeInTheDocument();
    expect(screen.queryByText("ایدی تلگرام")).toBeNull();
  });

  test("closes the Popup when clicking outside", () => {
    const setShowMock = jest.fn();
    render(
      <Popup
        phone="09030335008"
        setShow={setShowMock}
        telegram_id="test_telegram"
      />
    );

    const popupBody = screen.getByText("اطلاعات تماس").closest(".popup_body");
    userEvent.click(popupBody);
    expect(setShowMock).not.toHaveBeenCalled();
  });
});
