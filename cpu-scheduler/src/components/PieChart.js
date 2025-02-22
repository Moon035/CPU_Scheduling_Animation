import { Chart, registerables } from "chart.js";
import React, { useEffect, useRef } from "react";

Chart.register(...registerables);

const PieChart = ({ processes, executionProgress }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");

        
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        
        const totalBurst = processes.reduce((acc, p) => acc + p.initialBurst, 0);

        
        const executedPercentages = processes.map((p) =>
            ((p.initialBurst - p.burstTime) / totalBurst) * 100
        );

        
        let cumulativePercent = 0;
        let filledData = executedPercentages.map((percent) => {
            cumulativePercent += percent;
            return percent;
        });

        
        filledData.push(100 - cumulativePercent);

        
        const colors = [...processes.map((p) => p.color), "#D3D3D3"];

        chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: [...processes.map((p) => p.id), "Remaining"],
                datasets: [
                    {
                        data: filledData,
                        backgroundColor: colors,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "50%",
                animation: {
                    duration: 500,
                    easing: "easeInOutQuad",
                },
            },
        });
    }, [processes]);

    return <canvas ref={chartRef} style={styles.canvas}></canvas>;
};

const styles = {
    canvas: {
        width: "100%",
        height: "250px",
        display: "block",
        margin: "auto",
    },
};

export default PieChart;
