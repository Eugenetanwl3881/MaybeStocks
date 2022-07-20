import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BuyInput from "./BuyInput";

const mockedFunction = jest.fn();

describe("Buy field renders properly", () => {
  it("should render Buy input", () => {
    render(
      <BuyInput
        transactions={[]}
        setTransactions={mockedFunction}
        portfoliosMap={{}}
        setPortfoliosMap={mockedFunction}
        wallet={1000}
        setWallet={mockedFunction}
        data={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText(/e.g 10/i);
    expect(inputElement).toBeInTheDocument();
  });
});

describe("Buy button renders properly", () => {
  it("should render Buy button", () => {
    render(
      <BuyInput
        transactions={[]}
        setTransactions={mockedFunction}
        portfoliosMap={{}}
        setPortfoliosMap={mockedFunction}
        wallet={1000}
        setWallet={mockedFunction}
        data={{}}
      />
    );

    const buyButtonElement = screen.getByTestId("buyButton");
    expect(buyButtonElement).toBeInTheDocument();
  });
});

describe("Buy field gets correct input", () => {
  it("should get correct input given", () => {
    render(
      <BuyInput
        transactions={[]}
        setTransactions={mockedFunction}
        portfoliosMap={{}}
        setPortfoliosMap={mockedFunction}
        wallet={1000}
        setWallet={mockedFunction}
        data={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText(/e.g 10/i);
    fireEvent.change(inputElement, { target: { value: "40" } });
    expect(inputElement.value).toBe("40");
  });
});
