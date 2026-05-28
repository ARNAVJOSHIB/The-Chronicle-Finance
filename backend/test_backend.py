import requests
import json

# Test compound interest calculation
compound_interest_data = {
    "principal": 10000,
    "annual_rate": 5,
    "monthly_contribution": 100,
    "compounding_frequency": 12,
    "inflation_rate": 2.5,
    "years": 10
}

# Test DCF calculation
dcf_data = {
    "initial_revenue": 100000,
    "revenue_growth_rate": 3,
    "operating_margin": 15,
    "tax_rate": 25,
    "discount_rate": 8,
    "terminal_growth_rate": 3,
    "years": 5
}

# Test Monte Carlo simulation
monte_carlo_data = {
    "initial_capital": 10000,
    "expected_return": 0.08,
    "volatility": 0.15,
    "num_simulations": 1000,
    "risk_free_rate": 0.02,
    "years": 10
}

# Test the FastAPI backend
response = requests.post("http://localhost:8000/api/calculate-compound-interest", json=compound_interest_data)
print("Compound Interest Response:", response.json())