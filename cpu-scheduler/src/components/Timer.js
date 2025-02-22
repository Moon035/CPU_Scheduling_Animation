import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Timer = ({ currentTime }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!timerRef.current) return;

        const svg = d3.select(timerRef.current)
            .attr("width", 200)
            .attr("height", 50);

        svg.selectAll("*").remove();

        svg.append("text")
            .attr("x", 100)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .attr("fill", "black")
            .text(`Timer: ${currentTime}`);
    }, [currentTime]);  
    return <svg ref={timerRef}></svg>;
};

export default Timer;
