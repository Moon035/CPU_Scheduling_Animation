import React, { useEffect, useState, useRef } from "react";
import ChartContainer from "./ChartContainer";
import Timer from "./Timer";

const RoundRobinSimulator = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [executionProgress, setExecutionProgress] = useState(0);
    const [numProcesses, setNumProcesses] = useState(3);
    const [timeQuantum, setTimeQuantum] = useState(2);
    const [processes, setProcesses] = useState([]);

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
                burstTime: Math.floor(Math.random() * 6) + 2,
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

    //Create a queue for execution list (in arrival order).     We need processes and quantum
    const generateExecutionQueue = (processes, timeQuantum) => {

        //Create an empty queue
        let queue = [];

        //Save the remaining running time of each process
        let remainingBursts = processes.map((p) => ({
            id: p.id,
            burstTime: p.burstTime,
        }));



        //Runs until the remaining time of the process becomes 0
        while (remainingBursts.some((p) => p.burstTime > 0)) {

            //Runs all processes
            for (let i = 0; i < processes.length; i++) {
                let process = remainingBursts[i];

                //If it's a process that still has time to run
                if (process.burstTime > 0) {

                    //Decide how many times to run
                    //execute by the timeQuantime
                    //If the remaining burstTime is less then quantum, run only by that amount
                    let executionTime = Math.min(timeQuantum, process.burstTime);

                    //add processes to execute into queue
                    queue.push({ ...process, executionTime });

                    //Update remaining runtime
                    process.burstTime -= executionTime;
                }
            }
        }

        return queue;
    };

    // Start Simulation
    const startSimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        setCurrentTime(0);
        setExecutionProgress(0);
        runRoundRobin();
    };

    // Run RR Scheduling
    const runRoundRobin = () => {
        let queue = generateExecutionQueue(processes, timeQuantum);
        let totalBurst = processes.reduce((acc, p) => acc + p.burstTime, 0);
        let executedTime = 0;

        const executeProcess = () => {
            if (queue.length === 0) {
                setIsRunning(false);
                setTimeout(() => {
                    setCurrentTime(0);
                    setExecutionProgress(0);
                }, 500);
                return;
            }

            let process = queue.shift();
            let executionTime = process.executionTime;
            
            const interval = setInterval(() => {
                if (executionTime > 0) {
                    setCurrentTime((prev) => prev + 1);
                    executedTime++;

                    setExecutionProgress((executedTime / totalBurst) * 100);

                    setProcesses((prevProcesses) =>
                        prevProcesses.map((p) =>
                            p.id === process.id ? { ...p, burstTime: p.burstTime - 1 } : p
                        )
                    );

                    executionTime--;
                } else {
                    clearInterval(interval);
                    executeProcess();
                }
            }, 500);
        };

        executeProcess();
    };

    return (
        <div style={styles.container}>
            <Timer currentTime={currentTime} />
            <ChartContainer processes={processes} executionProgress={executionProgress} />

            <div>
                <label style={styles.label}>Number of Processes: </label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={numProcesses}
                    onChange={(e) => setNumProcesses(Number(e.target.value))}
                    style={styles.input}
                />
                <label style={styles.label}>Time Quantum: </label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={timeQuantum}
                    onChange={(e) => setTimeQuantum(Number(e.target.value))}
                    style={styles.input}
                />
                <button onClick={() => generateRandomProcesses(numProcesses)} style={styles.generateButton}>
                    Generate Processes
                </button>
            </div>

            <button
                onClick={startSimulation}
                disabled={isRunning}
                style={styles.button}
            >
                Start Round Robin Simulation
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "20px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "10px",
    },
    input: {
        width: "60px",
        fontSize: "16px",
        padding: "5px",
        margin: "10px",
    },
    generateButton: {
        background: "#007BFF",
        color: "white",
        fontSize: "16px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "10px",
    },
    button: {
        background: "linear-gradient(135deg, #4CAF50, #2E8B57)",
        color: "white",
        fontSize: "18px",
        padding: "12px 24px",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        marginTop: "15px",
    },
};

export default RoundRobinSimulator;
