from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import router
from ai_insight import ai_insight_router
import uvicorn
import os

app = FastAPI(
    title="Chronicle Finance API",
    description="Financial model simulation API for Chronicle Finance",
    version="1.0.0"
)

# Add CORS Middleware
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],  # Allows frontend origin only
    allow_credentials=False,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the routers
app.include_router(router, prefix="/api")
app.include_router(ai_insight_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Chronicle Finance API"}

if __name__ == "__main__":
    # Run the test script to verify the API is working
    print("Starting backend server for testing...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)