import {useState} from "react";
import axios from "axios";

export default function Page() {
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [output, setOutput] = useState(null);

    const upload_image = async (e) => {
        e.preventDefault()
        // Display the file on the website
        const file = document.getElementById("fileUpload").files[0]

        const url = URL.createObjectURL(file);
        setUploadedUrl(url);
        console.log(uploadedUrl)
        // Send file per POST Request to Spring Server
        const formData = new FormData()
        formData.append("file", file)

        const resp = await axios.post("http://localhost:8080/api", formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(resp.status)

        // Send GET Request to Spring Server
        await get_output()
    }

    const get_output = async () => {
        try {
            const response = await fetch("http://localhost:8080/api", {
                mode: 'cors',
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(
                    `ERROR STATUS ${response.status}`
                )
            }
            const data = await response.json()
            setOutput(data);
        } catch (error) {
            if (error instanceof SyntaxError) {
                alert("Only JPG/JPEG files!");
            } else {
                console.error('ERROR', error);
            }
        }
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
            <div id="description">
                <h2>Hair: {JSON.stringify(output["hair"], null, 2)}</h2>
                <h2>Attractiveness: {JSON.stringify(output["attractiveness"], null, 2)}</h2>
                <h2>Smiling: {JSON.stringify(output["smiling"], null, 2)}</h2>
                <h2>Nose size: {JSON.stringify(output["nose_size"], null, 2)}</h2>
            </div>
            <form onSubmit={upload_image}>
                <input id="fileUpload" type="file" name="fileUpload"/>
                <input id="upload" type="submit" value="Describe"/>
            </form>
            </body>
            <footer>
                <p id="foot">© Tymur Arduch</p>
            </footer>
        </>
    )
}