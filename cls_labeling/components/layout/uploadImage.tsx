export default function UploadImage() {

    return (
        <div>
            <form action="http://localhost:8000/upload_image" enctype="multipart/form-data" method="post">
            <input name="files" type="file" multiple />
            <input type="submit" />
            </form>
        </div>
    )
}