import React, { useRef } from "react";
import Header from "./components/Header";
import AlgorithmSection from "./components/AlgorithmSection";

function App() {
    const sectionRef = {
        FIFO: useRef(null),
        SJF: useRef(null),
        STCF: useRef(null),
        RR: useRef(null),
        MLFQ: useRef(null),
    };

    const descriptions = {
        FIFO: "Processes are executed in the order they arrive. (First In, First Out)",
        SJF: "Executes the process with the shortest burst time first. (Shortest Job First)",
        STCF: "Preemptive SJF: The process with the least remaining time executes next.",
        RR: "Each process gets a fixed time slot before moving to the next. (Round Robin)",
        MLFQ: "Multiple priority queues adjust based on CPU burst time. (Multi-Level Feedback Queue)"
    };

    const scrollToSection = (id) => {

        const headerHeight = document.querySelector("header").offsetHeight;

        if (sectionRef[id]?.current) {
            const elementPosition = sectionRef[id].current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerHeight + 85,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <Header scrollToSection={scrollToSection} />
            <div style={{ marginTop: "80px" }}>
                {Object.keys(sectionRef).map((key) => (
                    <div key={key} ref={sectionRef[key]}>
                        <AlgorithmSection 
                            id={key} 
                            title={`${key} Scheduling`} 
                            description={descriptions[key]} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
