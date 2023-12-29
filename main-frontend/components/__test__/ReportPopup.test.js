import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReportPopup from "../ReportPopup";
import { http } from "../../http-services/http";
jest.mock("../../http-services/http");

describe("ReportPopup component", () => {
  const mockSetShow = jest.fn();

  test("renders ReportPopup component", () => {
    render(<ReportPopup setShow={mockSetShow} posterId={123} />);

    expect(screen.getByText("گزارش آگهی")).toBeInTheDocument();
    expect(screen.getByText("متن گزارش")).toBeInTheDocument();

    expect(screen.getByText("بستن")).toBeInTheDocument();
    expect(screen.getByText("ارسال گزارش")).toBeInTheDocument();
  });

  test("closes the ReportPopup when clicking close", () => {
    render(<ReportPopup setShow={mockSetShow} posterId={123} />);

    fireEvent.click(screen.getByText("بستن"));

    expect(mockSetShow).toHaveBeenCalledWith(false);
  });

  test("sends report when clicking send report with valid description", async () => {
    http.post.mockResolvedValueOnce({}); // Mocking a successful API response

    render(<ReportPopup setShow={mockSetShow} posterId={123} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Sample report description" },
    });
    fireEvent.click(screen.getByText("ارسال گزارش"));

    expect(screen.getByLabelText("oval-loading")).toBeInTheDocument(); // Verify loading spinner is present

    await waitFor(() => {
      expect(http.post).toHaveBeenCalledWith(
        "/api/v1/reports/report-poster?poster_id=123&issuer_id=4&report_type=other&description=Sample report description",
        {}
      );
      expect(mockSetShow).toHaveBeenCalledWith(false);
      //   expect(screen.queryByLabelText("oval-loading")).toBeNull(); // Verify loading spinner is not present after API call
    });
  });

  //   test("shows error toast when clicking 'ارسال گزارش' with empty description", async () => {
  //     render(<ReportPopup setShow={mockSetShow} posterId={123} />);

  //     fireEvent.click(screen.getByText("ارسال گزارش"));

  //     await waitFor(() => {
  //       expect(http.post).not.toHaveBeenCalled(); // Verify that http.post is not called
  //       expect(mockSetShow).not.toHaveBeenCalled(); // Verify that setShow is not called
  //       expect(screen.queryByLabelText("oval-loading")).toBeNull(); // Verify loading spinner is not present
  //       expect(
  //         screen.getByText("لطفا متن گزارش را وارد کنید")
  //       ).toBeInTheDocument(); // Verify error toast message
  //     });
  //   });
});
