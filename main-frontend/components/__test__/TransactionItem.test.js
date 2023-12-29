import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionItem from "../TransactionItem";

describe("TransactionItem component", () => {
  test("renders transaction item correctly", () => {
    const mockTransaction = {
      date: "2023-01-01T00:00:00.000Z",
      amount: 100,
      state: "pending",
    };

    const { getByText, container } = render(
      <TransactionItem {...mockTransaction} />
    );

    expect(getByText("2023-01-01")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("در حال بررسی")).toBeInTheDocument();

    const transactionItem = container.querySelector(".transaction_item");
    expect(transactionItem).toHaveClass("transaction_item");

    const transactionSubitem = container.querySelector(".transaction_subitem");
    expect(transactionSubitem).toHaveClass("transaction_subitem");
  });

  test('renders transaction item with "paid" state correctly', () => {
    const mockTransaction = {
      date: "2023-01-01T00:00:00.000Z",
      amount: 100,
      state: "paid",
    };

    const { getByText } = render(<TransactionItem {...mockTransaction} />);

    expect(getByText("موفق")).toBeInTheDocument();
  });
});
