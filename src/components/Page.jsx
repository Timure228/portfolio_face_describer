import {useState} from "react";

export default function Page() {
    const [uploadedUrl, setUploadedUrl] = useState("");

    const upload_image = async (e) => {
        e.preventDefault()
        const file = document.getElementById("fileUpload").files[0]

        const url = URL.createObjectURL(file);
        setUploadedUrl(url);
        console.log(uploadedUrl)

    }

    return (
        <>
            <header>
                <h1>Face<br/>Describer</h1>
                <p id="let_me">Let me see your</p><span style={{color: "red"}}>face...</span>
                <img id="see" src="/public/see.png" width={180} height={180}/>
            </header>
            <body>
            <img id="face" src={uploadedUrl} width={256} height={300}/>
            </body>
            <form onSubmit={upload_image}>
                <input id="fileUpload" type="file" name="fileUpload"/>
                <input id="upload" type="submit" value="Upload"/>
            </form>
            <footer>
                <p id="foot">© Tymur Arduch</p>
            </footer>
        </>
    )
}