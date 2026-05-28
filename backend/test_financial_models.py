import requests
import json

# Test data for compound interest calculation
compound_interest_data = {
    "principal": 10000,
    "annual_rate": 5,
    "monthly_contribution": 100,
    "compounding_frequency": 12,
    "inflation_rate": 2.5,
    "years": 10
}

# Test data for DCF calculation
dcf_data = {
    "initial_revenue": 100000,
    "revenue_growth_rate": 3,
    "operating_margin": 15,
    "tax_rate": 25,
    "discount_rate": 8,
    "terminal_growth_rate": 3,
    "years": 5
}

# Test data for Monte Carlo simulation (Stochastic DCF)
monte_carlo_data = {
    "initial_revenue": 1000000,
    "revenue_growth_mean": 10,
    "revenue_growth_std": 2,
    "operating_margin_mean": 15,
    "operating_margin_std": 1,
    "tax_rate": 25,
    "discount_rate": 10,
    "terminal_growth_rate": 2,
    "num_simulations": 500,
    "years": 5
}

# Test the FastAPI backend
print("Testing Compound Interest Calculation...")
try:
    response = requests.post("http://localhost:8000/api/calculate-compound-interest", json=compound_interest_data)
    print("Compound Interest Response:", json.dumps(response.json(), indent=2))
except Exception as e:
    print("Compound Interest Error:", e)

print("\nTesting DCF Calculation...")
try:
    response = requests.post("http://localhost:8000/api/calculate-dcf", json=dcf_data)
    print("DCF Response:", json.dumps(response.json(), indent=2))
except Exception as e:
    print("DCF Error:", e)

print("\nTesting Monte Carlo Simulation...")
try:
    response = requests.post("http://localhost:8000/api/run-monte-carlo", json=monte_carlo_data)
    print("Monte Carlo Response Summary:")
    res = response.json()
    print(f"Mean NPV: {res.get('mean_value')}")
    print(f"Median NPV: {res.get('median_value')}")
    print(f"Percentiles: {res.get('percentiles')}")
except Exception as e:
    print("Monte Carlo Error:", e)