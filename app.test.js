const { calculateCarbonFootprint, generateInsights } = require('./app');

describe('Elite Tier Carbon Evaluation Engine', () => {
    test('Calculates perfect standard inputs without mathematical drifting', () => {
        expect(calculateCarbonFootprint(100, 'petrol', 100)).toBe(106);
    });
    test('Gracefully sanitizes hazardous or broken inputs to 0', () => {
        expect(calculateCarbonFootprint(-100, 'electric', 'corrupted')).toBe(0);
    });
    test('Generates targeted strategic mitigation insights reliably', () => {
        expect(generateInsights(500, 'petrol', 500).length).toBeGreaterThanOrEqual(1);
    });
});
