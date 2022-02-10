from typing import Optional
from glob import glob
import pathlib
from sqlmodel import Field, Session, SQLModel, create_engine

def get_images(folder:str="./images"):
    return glob(str(pathlib.Path(folder,"**","*.jpg")), recursive=True)


class Image(SQLModel, table=True):
    key: Optional[int] = Field(default=None, primary_key=True)
    image_name: str
    label: str
    image_url: str

engine = create_engine("sqlite:///image.db")

SQLModel.metadata.create_all(engine)

images = []

for i, image in enumerate(get_images()):
    images.append(
        Image(key=i, image_name=pathlib.Path(image).stem, label="", image_url=image)
    )

with Session(engine) as session:
    for data in images: session.add(data)
    session.commit()