#!/bin/bash
# Database setup script

# Set up the PostgreSQL database for the Chronicle Finance application

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null
then
    echo "PostgreSQL is not installed. Please install PostgreSQL and try again."
    exit 1
fi

# Create the database if it doesn't exist
psql -U postgres -c "SELECT 1 FROM pg_database WHERE datname = 'chronicle_finance';" | grep -q "1" || psql -U postgres -c "CREATE DATABASE chronicle_finance;"

# Initialize the database
cd backend
python init_db.py