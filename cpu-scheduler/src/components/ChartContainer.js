import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartContainer = ({ processes, executionProgress }) => {
    return (
        <div style={styles.container}>
            <div style={styles.chartWrapper}>
                <BarChart processes={processes} />
            </div>
            <div style={styles.chartWrapper}>
                <PieChart processes={processes} executionProgress={executionProgress} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
    },
    chartWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
    },
};

export default ChartContainer;
