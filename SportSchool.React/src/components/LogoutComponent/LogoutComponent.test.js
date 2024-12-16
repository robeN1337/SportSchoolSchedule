import React from "react";
import { shallow } from "enzyme";
import LogoutComponent from "./LogoutComponent";

describe("LogoutComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LogoutComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
