from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Simple FastAPI Backend")

# CORS settings to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/status")
def get_status():
    return {"status": "Backend is running!", "version": "1.0"}

@app.get("/api/data")
def get_data():
    return {
        "items": [
            {"id": 1, "name": "Item One"},
            {"id": 2, "name": "Item Two"},
            {"id": 3, "name": "Item Three"}
        ]
    }