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




    // Generate random process
    const generateRandomProcesses = (count) => {
        let newProcesses = Array.from({ length: count }, (_, i) => {
            const processId = `P${i + 1}`;
            return {
                id: processId,
                arrival: Math.floor(Math.random() * 6),
                burstTime: Math.floor(Math.random() * 6) + 8,
                initialBurst: 0,
                color: getColorForProcess(processId),
            };
        });

        // Align process in arrival order
        newProcesses = newProcesses.sort((a, b) => a.arrival - b.arrival);

        // Save initial burstTime
        newProcesses = newProcesses.map((p) => ({ ...p, initialBurst: p.burstTime }));

        setProcesses(newProcesses);
    };




    //Setting priority queue, priority boosting
    const assignQuantumAndBoosting = () => {
        const q0_quantum = 1;
        const q1_quantum = 2;
        const q2_quantum = Math.floor(Math.random() * 3) + 8;
        const priorityBoosting = 5;
        setQueueQuantum({q0_quantum, q1_quantum, q2_quantum});
        setPriorityBoosting(priorityBoosting);
    };



    

    





    













}







export default MLFQSimulator;