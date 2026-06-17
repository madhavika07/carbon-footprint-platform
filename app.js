const EMISSION_FACTORS = { electricityKwh: 0.85, petrolKm: 0.21, dieselKm: 0.19, electricKm: 0.05 };

function calculateCarbonFootprint(electricity, vehicleType, distance) {
    const cleanElectricity = Math.max(0, parseFloat(electricity) || 0);
    const cleanDistance = Math.max(0, parseFloat(distance) || 0);
    const transportFactor = EMISSION_FACTORS[vehicleType + 'Km'] || EMISSION_FACTORS.petrolKm;
    return parseFloat((cleanElectricity * EMISSION_FACTORS.electricityKwh + cleanDistance * transportFactor).toFixed(2));
}

function generateInsights(electricity, vehicleType, distance) {
    const insights = [];
    if (electricity > 250) insights.push("Your electricity footprint is high. Consider energy-saving appliances or solar alternatives.");
    if ((vehicleType === 'petrol' || vehicleType === 'diesel') && distance > 300) {
        insights.push(`Switching to public transit or an EV could save up to ${Math.round(distance * 0.15)}kg of CO₂ monthly.`);
    }
    if (insights.length === 0) insights.push("Excellent work! Your carbon footprints are currently within sustainable bounds.");
    return insights;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('carbonForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const elec = document.getElementById('electricity').value;
        const type = document.getElementById('vehicleType').value;
        const dist = document.getElementById('distance').value;
        
        const total = calculateCarbonFootprint(elec, type, dist);
        document.getElementById('scoreDisplay').textContent = total;
        
        const pct = Math.min(100, (total / 1000) * 100);
        document.getElementById('scoreBar').style.width = `${pct}%`;
        document.getElementById('progressContainer').setAttribute('aria-valuenow', total);

        const list = document.getElementById('insightsList');
        list.innerHTML = '';
        generateInsights(elec, type, dist).forEach(txt => {
            const li = document.createElement('li');
            li.textContent = txt; // XSS protection injection defense
            list.appendChild(li);
        });
    });
});

if (typeof module !== 'undefined') module.exports = { calculateCarbonFootprint, generateInsights };
