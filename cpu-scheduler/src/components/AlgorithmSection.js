import React from 'react';

function AlgorithmSection({ id, title, description }) {
    return (
        <section id={id} style={styles.section}>
            <h2>{title}</h2>
            <p>{description}</p>
            <button>Start Simulation</button>
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
};



export default AlgorithmSection;