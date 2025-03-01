import React, { useEffect, useState, useRef } from "react";
import ChartContainer from "./ChartContainer";
import Timer from "./Timer";



const MLFQSimulator = () => {
    const[isRunning, setIsRunning] = useState(false);
    const[currentTime, setCurrentTime] = useState(0);
    const[executionProgress, setExecutionProgress] = useState(0);
    const[numProcess, setNumProcesses] = useState(3);
    const[processes, setProcesses] = useState([]);


    const colorMap = useRef({});
    const availableColors = ["red", "blue", "green", "orange", "purple", "cyan", "pink", "brown", "lime", "magenta"];

    const getColorForProcess = (id) => {
        if (!colorMap.current[id]) {
            colorMap.current[id] = availableColors[Object.keys(colorMap.current).length % availableColors.length];
        }
        return colorMap.current[id];
    };



}







export default MLFQSimulator;