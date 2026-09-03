from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/health")
async def healthcheck():
    return JSONResponse({"status": "ok"})
