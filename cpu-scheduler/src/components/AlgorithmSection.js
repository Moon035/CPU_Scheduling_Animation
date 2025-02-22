import React, { useState } from 'react';
import Simulator from './Simulator';


function AlgorithmSection({ id, title, description }) {

    const [showSimulation, setShowSimulation] = useState(false);


    return (
        <section id={id} style={styles.section}>
            <h2>{title}</h2>
            <p>{description}</p>


            <button 
                style={styles.simulationButton}
                onClick ={() => setShowSimulation(!showSimulation)}
                onMouseEnter={(e) => e.target.style.background = styles.buttonHover.background}
                onMouseLeave={(e) => e.target.style.background = styles.simulationButton.background}
                onMouseDown={(e) => e.target.style.transform = styles.buttonActive.transform}
                onMouseUp={(e) => e.target.style.transform = "scale(1)"}
            >
                {showSimulation ? "Hide Simulation" : "Show Simulation"}
            </button>

            {/* Start Simulation*/}
            {showSimulation && <Simulator algorithm={id} />}

        </section>
    );
}




const styles = {
    section: {
        padding: "80px 20px",
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        borderRadius: "5px",
    },

    simulationButton: {
        background: "linear-gradient(135deg, #ff7f50, #ff4500)", 
        color: "white",
        fontSize: "16px",
        padding: "12px 24px",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
        marginTop: "15px",
    },

    buttonHover: {
        background: "linear-gradient(135deg, #ff4500, #c0392b)", 
    },

    buttonActive: {
        transform: "scale(0.95)",
    },
};

export default AlgorithmSection;
