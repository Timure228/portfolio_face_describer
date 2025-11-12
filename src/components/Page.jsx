import {useState} from "react";
import axios from "axios";

export default function Page() {
    // current image URL
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [output, setOutput] = useState("");
    // Model choosing
    const [modelName, setModelName] = useState("model_cnn.keras");
    const [loadingText, setLoadingText] = useState("");
    // History staff
    const [history_url, setHistory_url] = useState([])
    const [amount_img, setAmount_img] = useState(0)

    const feedback = [0, 0, 0, 0, 0, 0, 0]

    const upload_image = async (e) => {
        e.preventDefault()
        setOutput([])
        // Display the file on the website
        const file = document.getElementById("fileUpload").files[0]
        const url = URL.createObjectURL(file);
        setUploadedUrl(url);
        // Image history
        if (amount_img > 11) { // Delete first value if > 11 Images in history
            setHistory_url(prev => prev.slice(1))
        }
        setHistory_url(prev => [...prev, url]) // Image in history counter
        setAmount_img(amount_img + 1)
        // Send file per POST Request to Spring Server
        const formData = new FormData()
        formData.append("file", file)
        const resp = await axios.post("http://localhost:8080/api", formData, {
            headers: {"content-type": "multipart/form-data"}})
        console.log(resp.status)
        // Loading dots
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
            const response = await axios.get("http://localhost:8080/api",
                {params: {modelName}});

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

    function clear(e) {
        e.preventDefault()
        setHistory_url([])
        setAmount_img(0)
    }

    async function send_feedback(e) {
        e.preventDefault()
        console.log(feedback)
        const file = document.getElementById("fileUpload").files[0]
        // Send file per POST Request to Spring Server
        const feedbackData = new FormData()
        feedbackData.append("image", file)

        // turn feedback into a .json file
        const feedbackBlob = new Blob([JSON.stringify(feedback)], {type: "application/json"});
        const feedbackFile = new File([feedbackBlob], "feedback.json", {type: "application/json"});
        feedbackData.append("feedback", feedbackFile)
        const resp = await axios.post("http://localhost:8080/api/feedback", feedbackData, {
            headers: {"content-type": "multipart/form-data"}})
        console.log(resp.status)

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
            <div className="checkboxes">
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="0" id="cheap-49" type="checkbox"
                               onChange={(e) => feedback[0] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-49"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="1" id="cheap-50" type="checkbox"
                               onChange={(e) => feedback[1] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-50"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="2" id="cheap-51" type="checkbox"
                               onChange={(e) => feedback[2] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-51"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="3" id="cheap-52" type="checkbox"
                               onChange={(e) => feedback[3] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-52"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="4" id="cheap-53" type="checkbox"
                               onChange={(e) => feedback[4] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-53"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="5" id="cheap-54" type="checkbox"
                               onChange={(e) => feedback[5] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-54"></label>
                    </div>
                </div>
                <div className="checkbox-wrapper-49">
                    <div className="block">
                        <input data-index="6" id="cheap-55" type="checkbox"
                               onChange={(e) => feedback[6] = e.target.checked ? 1 : 0}/>
                        <label htmlFor="cheap-55"></label>
                    </div>
                </div>
                <button id="send_feedback" onClick={(e) => send_feedback(e)}>Send</button>
            </div>
            <div id="choosing_model" style={{textAlign: "center", margin: "10px 0"}}>
                <label id="select_label" htmlFor="choose_model">Model:</label><br/>
                <select id="choose_model" value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="model_cnn.keras">Base Model (15'000)</option>
                    <option value="model_cnn_on_edited.keras">Base Model 10 (15'000)</option>
                    <option value="model_cnn_on_edited_90.keras">Base Model 10 (90'000)</option>
                    <option value="res_net_34.keras">Res-Net 34 (no work!)</option>
                    <option value="MobileNetV3_Small.keras">MobileNetV3Small</option>
                </select>
            </div>
            <div>
                <p id="amount">Amount Images: {amount_img}</p>
                <button id="clear" onClick={(e) => clear(e)}>Clear</button>
                <h1 id="history_title">History</h1>
                <div id="div_history">
                    {history_url.map(url => <img id="history_image" src={url} width={180} height={220}/>)}
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
