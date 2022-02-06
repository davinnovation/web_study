import Image from 'next/image'

interface ClsLabelInterface {
    src:string
}

function ClsLabel ({src}:ClsLabelInterface) {
    return (
        <Image 
            src={src}
            alt="Cls Label"
        />
    )
}

export default ClsLabel;