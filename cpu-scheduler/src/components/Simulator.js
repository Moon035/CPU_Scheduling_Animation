import React, { useEffect, useState } from "react";
import ChartContainer from "./ChartContainer";
import Timer from "./Timer";

const Simulator = ({ algorithm }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [executionProgress, setExecutionProgress] = useState(0); 

    const [processes, setProcesses] = useState([
        { id: "P1", arrival: 1, burstTime: 3, initialBurst: 3, color: "red" },
        { id: "P2", arrival: 2, burstTime: 5, initialBurst: 5, color: "blue" },
        { id: "P3", arrival: 3, burstTime: 2, initialBurst: 2, color: "green" },
    ]);

    const startSimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        runFIFO();
    };

    const runFIFO = () => {
        let totalBurst = processes.reduce((acc, p) => acc + p.burstTime, 0);
        let executedTime = 0;

        const executeProcess = (index) => {
            if (index >= processes.length) {
                setIsRunning(false);
                return;
            }

            const process = processes[index];
            let burstLeft = process.burstTime;

            const interval = setInterval(() => {
                if (burstLeft > 0) {
                    setCurrentTime((prev) => prev + 1);
                    burstLeft--;
                    executedTime++;

                    
                    setExecutionProgress((executedTime / totalBurst) * 100);

                    
                    setProcesses((prevProcesses) =>
                        prevProcesses.map((p, idx) =>
                            idx === index ? { ...p, burstTime: burstLeft } : p
                        )
                    );
                } else {
                    clearInterval(interval);
                    executeProcess(index + 1);
                }
            }, 1000);
        };

        executeProcess(0);

        setTimeout(() => {
            setIsRunning(false);
        }, totalBurst * 1000);
    };

    return (
        <div>
            <Timer currentTime={currentTime} />
            <ChartContainer processes={processes} executionProgress={executionProgress} />
            <button onClick={startSimulation} disabled={isRunning}>
                Start Simulation
            </button>
        </div>
    );
};

export default Simulator;
