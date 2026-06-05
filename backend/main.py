from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import router
from ai_insight import ai_insight_router
import uvicorn
import os
from dotenv import load_dotenv
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from limiter import limiter


load_dotenv()

app = FastAPI(
    title="Chronicle Finance API",
    description="Financial model simulation API for Chronicle Finance",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

ALLOWED_ORIGINS = [
    "https://the-chronicle-finance.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(router, prefix="/api")
app.include_router(ai_insight_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Chronicle Finance API"}

@app.get("/api/health")
def health_check():
    # Simple check for database configuration
    db_connected = os.getenv("SUPABASE_URL") is not None and os.getenv("SUPABASE_SERVICE_KEY") is not None
    return {
        "status": "ok", 
        "version": "1.0.0", 
        "database_connected": db_connected
    }

if __name__ == "__main__":
    # Run the test script to verify the API is working
    print("Starting backend server for testing...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)