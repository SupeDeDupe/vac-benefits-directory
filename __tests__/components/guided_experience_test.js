import { mount, shallow } from "enzyme";
import React from "react";

import { GuidedExperience } from "../../components/guided_experience";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperience", () => {
  let props;
  let _mountedGuidedExperience;
  let _shallowGuidedExperience;

  const mounted_GuidedExperience = () => {
    if (!_mountedGuidedExperience) {
      _mountedGuidedExperience = mount(<GuidedExperience {...props} />);
    }
    return _mountedGuidedExperience;
  };

  const shallow_GuidedExperience = () => {
    if (!_shallowGuidedExperience) {
      _shallowGuidedExperience = shallow(<GuidedExperience {...props} />);
    }
    return _shallowGuidedExperience;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      setSection: jest.fn(),
      classes: {},
      id: "YY",
      nextSection: "ZZ",
      prevSection: "XX",
      stepNumber: 1,
      children: <div className="thing" />,
      subtitle: "",
      selectedEligibility: {
        patronType: "family",
        serviceType: "rcmp",
        statusAndVitals: "still-serving"
      }
    };
    _shallowGuidedExperience = undefined;
    _mountedGuidedExperience = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperience().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls setSection if the Next button is pressed", () => {
    mounted_GuidedExperience()
      .find("MobileStepper")
      .find("Button")
      .last()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("ZZ");
  });

  it("calls setSection if the Back button is pressed", () => {
    mounted_GuidedExperience()
      .find("MobileStepper")
      .find("Button")
      .first()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("XX");
  });

  it("renders children", () => {
    expect(shallow_GuidedExperience().find(".thing").length).toEqual(1);
  });

  it("has edit answer buttons with correct text", () => {
    expect(
      mounted_GuidedExperience()
        .find("Button")
        .at(2)
        .text()
    ).toEqual("still-serving");
  });

  it("sets the correct section if the edit answer button is pressed", () => {
    mounted_GuidedExperience()
      .find("Button")
      .first()
      .simulate("click");
    expect(props.setSection).toBeCalledWith("A1");
  });
});