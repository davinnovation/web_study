from minio import Minio
import os
from typing import Optional
from glob import glob
import pathlib
from sqlmodel import Field, Session, SQLModel, create_engine

def get_images(folder:str="../cls_labeling/public/images"):
    return glob(str(pathlib.Path(folder,"**","*.jpg")), recursive=True)


class Image(SQLModel, table=True):
    key: Optional[int] = Field(default=None, primary_key=True)
    image_name: str
    label: str
    image_url: str


if __name__ == "__main__":
    engine = create_engine("sqlite:///image.db")
    client = Minio(
        "localhost:9001",
        secure=False,
        access_key="EXAVEJZMEVFXX0Q608ET",
        secret_key="xNWX4mrfavyKlmzw0MWoLv3E6Irt4yhz85VC+TjS"
    )

    bucket_found = client.bucket_exists("image")
    if not bucket_found:
        client.make_bucket("image")
    else:
        for obj in client.list_objects("image"):
            client.remove_object("image", obj.object_name)
        client.remove_bucket("image")
        client.make_bucket("image")
        os.remove("./image.db")

    SQLModel.metadata.create_all(engine)

    images = []

    for i, image in enumerate(get_images()):
        print(pathlib.Path(image).stem, image)
        image_name = pathlib.Path(image).stem+'.jpg'
        client.fput_object(
            "image", image_name, image
        )

        image_url = f"http://localhost:9001/image/{image_name}"

        images.append(
            Image(key=i, image_name=pathlib.Path(image).stem, label="", image_url=image_url)
        )

    with Session(engine) as session:
        for data in images: session.add(data)
        session.commit()