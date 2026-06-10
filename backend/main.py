import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="World Cup Predictor API", docs_url=None, redoc_url=None)

# In production set ALLOWED_ORIGINS to your Vercel URL (comma-separated if multiple)
# e.g. ALLOWED_ORIGINS=https://worldcup-predictor.vercel.app
_raw = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173")
origins = [o.strip() for o in _raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(router)
