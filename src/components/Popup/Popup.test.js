import Popup from "./Popup";
import { render } from "@testing-library/react";

describe("Popup should show when trigger is true", () => {
  it("Popup shows", () => {
    const { getByTestId } = render(<Popup trigger={true} />);
    const popup = getByTestId("popup");
    expect(popup).toBeTruthy();
  });
});
