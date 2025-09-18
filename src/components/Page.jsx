import {useState} from "react";
import axios from "axios";

export default function Page() {
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [output, setOutput] = useState("");
    const [modelName, setModelName] = useState("model_cnn.keras");
    const [loadingText, setLoadingText] = useState("");

    const [history_url, setHistory_url] = useState([])
    const [amount_img, setAmount_img] = useState(0);

    const upload_image = async (e) => {
        e.preventDefault()
        // Display the file on the website
        const file = document.getElementById("fileUpload").files[0]
        const url = URL.createObjectURL(file);
        if (history_url.length < 12) {
            setAmount_img(amount_img + 1)
            setHistory_url(prev => [...prev, url])
        }
        setUploadedUrl(url);
        // Save in history
        console.log(history_url)
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

        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4; // 0..3
            setLoadingText(".".repeat(dots));
        }, 500); // every 500ms

        try {
            // Send GET Request to Spring Server
            await get_output()
        } finally {
            clearInterval(interval); // stop animation
            setLoadingText("");    // reset text
        }
    }
    const get_output = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api", {
                params: {modelName}
            });

            const data = await response.data
            setOutput(data);
        } catch (error) {
            if (error instanceof SyntaxError) {
                alert("File format incorrect!");
            } else {
                console.error('ERROR', error);
            }
        }
    }
    return (
        <>
            <header>
                <h1 id="titel">Face<br/>Describer</h1>
                <p id="let_me">Let me see your</p><span style={{color: "red"}}>face...</span>
                <img id="see" src="/public/see.png" width={180} height={180}/>
            </header>
            <body id="page_body">
            <img id="face" src={uploadedUrl} width={256} height={300}/>
            <p id="loading">{loadingText}</p>
            <div id="description">
                <h2>Hair: {JSON.stringify(output["hair"], null, 2)}</h2>
                <h2>Attractiveness: {JSON.stringify(output["attractiveness"], null, 2)}</h2>
                <h2>Smiling: {JSON.stringify(output["smiling"], null, 2)}</h2>
                <h2>Nose size: {JSON.stringify(output["nose_size"], null, 2)}</h2>
                <h2>Oval Face: {JSON.stringify(output["oval_face"], null, 2)}</h2>
                <h2>Young: {JSON.stringify(output["young"], null, 2)}</h2>
                <br/>
                <h2 id="gender">Gender: {JSON.stringify(output["gender"], null, 2)}</h2>
            </div>
            <form onSubmit={upload_image}>
                <input id="fileUpload" type="file" name="fileUpload"/>
                <input id="upload" type="submit" value="Describe"/>
            </form>
            <div style={{textAlign: "center", margin: "10px 0"}}>
                <label id="select_label" htmlFor="choose_model">Model:</label><br/>
                <select id="choose_model" value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="model_cnn.keras">Base Model</option>
                    <option value="res_net_34.keras">Res-Net 34</option>
                    <option value="MobileNetV3_Small.keras">MobileNetV3Small</option>
                </select>
            </div>
            <div>
                <p id="amount">Amount Images: {amount_img}</p>
                <h1 id="history_title">History</h1>
                <div id="img_history">
                    {history_url.map(url => <img id="image" src={url} width={180} height={220}/>)}
                </div>
            </div>
            </body>
            <hr color="black" width="1300px" size={2}/>
            <footer>
                <p id="foot">© Tymur Arduch</p>
            </footer>
        </>
    )
}