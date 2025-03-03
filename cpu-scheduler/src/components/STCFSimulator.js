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


    //Color mapping
    const getColorForProcess = (id) => {
        if (!colorMap.current[id]) {
            colorMap.current[id] = availableColors[Object.keys(colorMap.current).length % availableColors.length];
        }
        return colorMap.current[id];
    };

    //Generate random processes
    const generateRandomProcesses = (count) => {
        let newProcesses = Array.from({ length: count }, (_, i) => ({
            id: `P${i + 1}`,
            arrival: Math.floor(Math.random() * 6), // assign random arrivalTime
            burstTime: Math.floor(Math.random() * 6) + 2, // assign execution time randomly
            initialBurst: 0,
            color: getColorForProcess(`P${i + 1}`),
        }));

        // Align processes in arrival order
        newProcesses.sort((a, b) => a.arrival - b.arrival);

        // Save initial burstTime of each process
        newProcesses = newProcesses.map((p) => ({ ...p, initialBurst: p.burstTime }));

        setProcesses(newProcesses);
        setExecutionProgress(0); //Initialize execution progress
        setReadyQueue([]);
        setExecutionQueue([]);
    };








    const startSimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        setCurrentTime(0);
        setExecutionProgress(0);


        //Copy list of processes. add remainingTime property
        let processList = [...processes].map((p) => ({
            ...p, remainingTime: p.burstTime,
        }));

        let executedTime = 0;
        let time = 0;


        let readyQueue = [];
        let executionQueue = []; 


        //Repeated execution function that runs a particular task every second
        const interval = setInterval(() => {

            // If a process remains in the list of processes that haven't been executed.
            //Pull the process at the beginning of the process list and add it to the readyQueue
            if (processList.length > 0) {
                let nextProcess = processList.shift();
                readyQueue.push(nextProcess);
            }

            
        }, 1000);
    };

    
};



export default STCFSimulator;
