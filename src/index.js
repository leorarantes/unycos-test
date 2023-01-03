import React from "react";
import { createRoot } from 'react-dom/client';

import Slider from "./react/components/Slider";
import "./styles/reset.css";
import "./styles/style.css";

console.log("Hello, JavaScript");
console.log(process.env.HELLO_ENV);

// render Slider as a react component
const container = document.querySelector('.slider-react');
const root = createRoot(container);
root.render(<Slider />);