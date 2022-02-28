import { Grid } from "@mui/material";
import UploadImage from "components/layout/uploadImage";

function ImageUploadPage() {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <UploadImage />
            </Grid>
        </Grid>
    )
}

export default ImageUploadPage;