brew install minio/stable/minio
minio server /data

uvicorn main:app --reload
