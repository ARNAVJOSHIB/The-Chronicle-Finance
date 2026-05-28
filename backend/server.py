from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from models import router
from ai_insight import ai_insight_router

app = FastAPI(
    title="Chronicle Finance API",
    description="Financial model simulation API for Chronicle Finance",
    version="1.0.0"
)

# CORS – allow all origins so the Next.js dev server can call the API
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=False,
    allow_methods=["*"],
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