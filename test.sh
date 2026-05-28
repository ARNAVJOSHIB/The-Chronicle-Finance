#!/bin/bash
# Test script for Chronicle Finance

echo "Running tests for Chronicle Finance..."

# Run backend tests
echo "Running backend tests..."
cd backend
python -m pytest test_financial_models.py

# Run frontend tests
echo "Running frontend tests..."
cd ..
npm test

echo "Tests completed"