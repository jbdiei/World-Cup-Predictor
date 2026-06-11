from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="World Cup Predictor API", docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(router)
