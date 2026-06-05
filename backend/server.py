from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from models import router
from ai_insight import ai_insight_router

load_dotenv()

app = FastAPI(
    title="Chronicle Finance API",
    description="Financial model simulation API for Chronicle Finance",
    version="1.0.0"
)

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
def read_root():
    return {"message": "Welcome to Chronicle Finance API"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)