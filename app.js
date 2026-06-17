document.getElementById('carbonForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Data Extraction & Explicit Sanitization
    const electricityRaw = document.getElementById('electricity').value;
    const distanceRaw = document.getElementById('distance').value;
    const vehicleType = document.getElementById('vehicleType').value;

    const electricity = parseFloat(electricityRaw);
    const distance = parseFloat(distanceRaw);

    // Strict Security Defenses Against Input Anomalies
    if (isNaN(electricity) || isNaN(distance) || electricity < 0 || distance < 0) {
        alert("Invalid input parameters. Please insert positive numbers.");
        return;
    }

    // Official Mathematical Constants
    const electricityFactor = 0.85; 
    let vehicleFactor = 0.20;       

    if (vehicleType === 'diesel') {
        vehicleFactor = 0.17;
    } else if (vehicleType === 'electric') {
        vehicleFactor = 0.05;
    }

    // Calculations
    const electricityImpact = electricity * electricityFactor;
    const transitImpact = distance * vehicleFactor;
    const totalImpact = electricityImpact + transitImpact;

    // Interface Rendering
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerText = totalImpact.toFixed(2);

    const progressPercentage = Math.min((totalImpact / 1000) * 100, 100);
    document.getElementById('scoreBar').style.width = `${progressPercentage}%`;

    // Secure Context-Aware Insights Injection
    const insightsList = document.getElementById('insightsList');
    insightsList.innerHTML = ''; 

    if (electricityImpact > 200) {
        const li = document.createElement('li');
        li.textContent = "Your electricity footprint is high. Consider energy-saving appliances or solar alternatives.";
        insightsList.appendChild(li);
    } else {
        const li = document.createElement('li');
        li.textContent = "Great job keeping household electricity utilization within ideal bounds.";
        insightsList.appendChild(li);
    }

    if (vehicleType !== 'electric' && distance > 300) {
        const li = document.createElement('li');
        li.textContent = "Switching to public transit or an EV could save up to 90kg of CO₂ monthly.";
        insightsList.appendChild(li);
    } else {
        const li = document.createElement('li');
        li.textContent = "Your transit footprint aligns well with target environmental safety ranges.";
        insightsList.appendChild(li);
    }
});
