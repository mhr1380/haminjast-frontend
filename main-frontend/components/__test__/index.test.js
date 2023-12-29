/* eslint-disable react/display-name */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios"; // You may need to mock axios responses

import Home from "../../pages/index";
import AuthProvider from "../../context/AuthProvider";

jest.mock("next/image", () => ({ src, alt }) => (
  <img src={"https://www.google.com"} alt={alt} />
));

jest.mock("axios");

describe("Home component", () => {
  test("renders home component correctly", async () => {
    const mockPosters = [
      {
        id: 1,
        images: [],
        title: "Sample Poster",
        addresses: [{ address_detail: "Sample Address" }],
        description: "Sample Description",
        tags: ["tag1", "tag2"],
        special_type: "Special Type",
        status: "found",
        award: "Sample Award",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: { posters: mockPosters } });

    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    expect(
      getByPlaceholderText("چی گم کردی ؟ مثلا کیف پول")
    ).toBeInTheDocument();

    expect(getByText("آخرین آگهی ها")).toBeInTheDocument();
    await waitFor(() => {
      mockPosters.slice(0, 4).forEach((poster) => {
        expect(getByText(poster.title)).toBeInTheDocument();
        expect(
          getByText(poster.addresses[0].address_detail)
        ).toBeInTheDocument();
        expect(getByText(poster.description)).toBeInTheDocument();
      });
    });
  });
});
