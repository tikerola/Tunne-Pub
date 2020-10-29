import { render, rerender } from "../../test-utils";
import React from "react";
import CustomHeaderTitle from "../CustomHeaderTitle";

describe("<CustomHeaderTitle", () => {
  const name = "Holabaloo";
  const letterNum = 8;

  it("should match snapshot", () => {
    expect(
      render(<CustomHeaderTitle name={name} letterNum={letterNum} />)
    ).toMatchSnapshot();
  });

  it("should put three dots if name is longer than letternum letters", () => {
    let component = render(
      <CustomHeaderTitle name={name} letterNum={letterNum} />
    );
    expect(component.queryByText("Holabalo...")).toBeTruthy();

    component.rerender(
      <CustomHeaderTitle name={"Hola"} letterNum={letterNum} />
    );
    expect(component.queryByText("Hola")).toBeTruthy();
  });
});
