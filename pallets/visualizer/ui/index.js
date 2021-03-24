import React from 'react';
import ReactDOM from 'react-dom';
import { BubbleChart } from '@hte/react-interactive-report';

const CreateBubbleChart = (params) => { return React.createElement(BubbleChart, params); }

/**
 * This function will be called UI of pallet will be opened
 * and Filte container will loaded from server
 *  registered in ./apiko-image-gallery.html
 * **/

if(window) {
    window.Visualizer = window.Visualizer || {};
    window.Visualizer.BubbleChart = CreateBubbleChart;
    window.Visualizer.render = ReactDOM.render;
    window.Visualizer.unmount = ReactDOM.unmountComponentAtNode;
    window.Visualizer.createRef = React.createRef;
}
