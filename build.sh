#!/bin/bash
# Build script for Chronicle Finance

echo "Building Chronicle Finance application..."

# Build the frontend
echo "Building frontend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Frontend build successful"
else
    echo "Frontend build failed"
    exit 1
fi

echo "Build process completed"