export default function About() {
    return (
        <>
            <header>
                <img id="see" src="/public/see.png" width={180} height={180}/>
            </header>
            <div>
                <h1>Über das Projekt</h1>
                <p id="about_text">
                    Die Idee kam mir, als ich mein KI-Projekt fertig gemacht habe.
                    <br/>Dann dachte ich: „Warum soll ich es nicht als Portfolio verwenden?“
                    <br/>Der Plan war, ich mache eine Webseite, wo ich die Fotos von
                    <br/>Gesichter auflade und dann eine Beschreibung bekomme.
                    <br/>Ich habe einen Mockup erstellt, damit ich weiss, wie meine
                    <br/>Webseite aussehen soll …
                    <br/>
                    <br/>Aber es gab noch ein anderes Problem: Mein KI-Modell ist in Python
                    <br/>geschrieben, und React kann keine Python-Dateien ausführen.
                    <br/>Darum habe ich entschieden, einen separaten Server für Python
                    <br/>zu erzeugen. Ich habe eine Spring-Boot-Applikation gemacht und
                    <br/>dort Python-Code ausgeführt und den Output als GET-Request
                    <br/>zurück an die Webseite gegeben.
                    <br/>
                    <br/>Und noch ein Problem: Wie kriegt Spring-Boot-Server die
                    <br/>Fotos von den Gesichtern? Ich habe einfach mit POST-Request
                    <br/>die Foto-Datei an Spring-Server geschickt und dort mit gleichem
                    <br/>Namen überschrieben, damit es nur eine Datei gibt.
                </p>
            </div>
        </>
    );
}