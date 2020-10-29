import { fireEvent } from "@testing-library/react-native";
import React from "react";
import CARD_DATA from "../../data/cards";
import { render } from "../../test-utils";
import ProgressImageStepContent from "../ProgressImageStepContent";

describe("<ProgressImageStepContent />", () => {
  const data = [CARD_DATA[0], CARD_DATA[1], CARD_DATA[2]];

  const navigation = {
    navigate: jest.fn(),
  };

  const navigateTo = "somewhere";
  const handleSubmit = jest.fn();

  it("should match snapshot", () => {
    expect(
      render(
        <ProgressImageStepContent
          navigation={navigation}
          data={data}
          navigateTo={navigateTo}
          handleSubmit={handleSubmit}
        />
      )
    ).toMatchSnapshot();
  });

  it("should render images", () => {
    const component = render(
      <ProgressImageStepContent
        navigation={navigation}
        data={data}
        navigateTo={navigateTo}
        handleSubmit={handleSubmit}
      />
    );

    const images = component.queryAllByTestId("image");
    expect(images.length).toBe(3);
  });

  it("should call handleSubmit when button is pushed", () => {
    const component = render(
      <ProgressImageStepContent
        navigation={navigation}
        data={data}
        navigateTo={navigateTo}
        handleSubmit={handleSubmit}
      />
    );

    fireEvent.press(component.getByText("Tallenna"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should navigate to imageScreen when pushed link", () => {
    const component = render(
      <ProgressImageStepContent
        navigation={navigation}
        data={data}
        navigateTo={navigateTo}
        handleSubmit={handleSubmit}
      />
    );

    fireEvent.press(component.getByText("tunnekuvista"));
    expect(navigation.navigate).toHaveBeenCalledWith(navigateTo);
  });
});
