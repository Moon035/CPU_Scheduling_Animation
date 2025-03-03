import React, { useState, useEffect, useRef } from "react";
import ChartContainer from "./ChartContainer";
import Timer from "./Timer";



const STCFSimulator = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [executionProgress, setExecutionProgress] = useState(0);
    const [numProcesses, setNumProcesses] = useState(3);
    const [processes, setProcesses] = useState([]);



    const [readyQueue, setReadyQueue] = useState([]);
    const [executionQueue, setExecutionQueue] = useState([]);



    const colorMap = useRef({});
    const availableColors = ["red", "blue", "green", "orange", "purple", "cyan", "pink", "brown", "lime", "magenta"];

    const getColorForProcess = (id) => {
        if (!colorMap.current[id]) {
            colorMap.current[id] = availableColors[Object.keys(colorMap.current).length % availableColors.length];
        }
        return colorMap.current[id];
    };




    //Generate Random Processes
    const generateRandomProcesses = (count) => {
        let newProcesses = Array.from({ length: count }, (_, i) => ({
            id: `P${i + 1}`,
            arrival: Math.floor(Math.random() * 6), // arrival randomly set btw 0~5
            burstTime: Math.floor(Math.random() * 6) + 2, // burstTime randomly set btw 2~7
            color: getColorForProcess(`P${i + 1}`),
        }));

        // Sort processes in arrival order
        newProcesses.sort((a, b) => a.arrival - b.arrival);

        setProcesses(newProcesses);
        setReadyQueue([]);
        setExecutionQueue([]);
    };  


};
export default STCFSimulator;

