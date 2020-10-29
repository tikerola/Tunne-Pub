import React from "react";
import { render } from "../../test-utils";
import ThankScreen from "../ThankScreen";

describe("<ThankScreen />", () => {
  it("should match snapshot", () => {
    expect(render(<ThankScreen />)).toMatchSnapshot();
  });
});
