import React, {useRef} from "react";
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

    const scrollToSection = (id) => {
        if (sectionRef[id]?.current) {
            sectionRef[id].current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <Header scrollToSection={scrollToSection} />
                <div style={{ marginTop: "80px" }}>

                    <div ref={sectionRef.FIFO}>
                        <AlgorithmSection
                            id="FIFO"
                            title="First In First Out (FIFO)"
                            description="abc"
                            ref={sectionRef.FIFO}
                        />
                    </div>

                    <div ref={sectionRef.SJF}>
                        <AlgorithmSection
                            id="SJF"
                            title="Shortest Job First (SJF)"
                            description="abc"
                            ref={sectionRef.SJF}
                        />
                    </div>

                    <div ref={sectionRef.STCF}>
                        <AlgorithmSection
                            id="STCF"
                            title="Shortest Time to Completion First (STCF)"
                            description="abc"
                            ref={sectionRef.STCF}
                        />
                    </div>

                    <div ref={sectionRef.RR}>
                        <AlgorithmSection
                            id="RR"
                            title="Round Robin (RR)"
                            description="abc"
                            ref={sectionRef.RR}
                        />
                    </div>

                    <div ref={sectionRef.MLFQ}>
                        <AlgorithmSection
                            id="MLFQ"
                            title="Multi-Level Feedback Queue (MLFQ)"
                            description="abc"
                            ref={sectionRef.MLFQ}
                        />
                    </div>
                </div>
        </div> 
    );
}

export default App;
