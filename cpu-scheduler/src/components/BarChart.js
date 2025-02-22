import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BarChart = ({ processes = [] }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); 

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");

        
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: processes.map((p) => p.id),
                datasets: [
                    {
                        label: "Burst Time",
                        data: processes.map((p) => p.burstTime),
                        backgroundColor: processes.map((p) => p.color),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 500,
                    easing: "easeInOutQuad",
                },
                scales: {
                    x: {
                        title: { display: true, text: "Processes" },
                    },
                    y: {
                        beginAtZero: true,
                        max: 10, // 🔥 Y축 최대값 고정
                        title: { display: true, text: "Burst Time" },
                    },
                },

                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }, [processes]); // processes가 변경될 때마다 차트를 다시 렌더링

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

export default BarChart;
