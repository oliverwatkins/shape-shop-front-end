

import React from "react";
import ReactDOM from "react-dom";
import {TestEffect} from "../TestEffect";



it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<TestEffect />, div);

    ReactDOM.unmountComponentAtNode(div);
});



