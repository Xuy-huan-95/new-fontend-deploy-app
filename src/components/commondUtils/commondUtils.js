
const getBase64 = (file) => {
    return (
        new Promise((resolve, reject) => {
            // doc file anh de convert sang dang base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)

        })
    )


}

export default getBase64;

