# Über das Projekt

Die Idee kam mir, als ich mein KI-Projekt fertig gemacht habe.
Dann dachte ich: „Warum soll ich es nicht als Portfolio verwenden?“
Der Plan war, ich mache eine Webseite, wo ich die Fotos von
Gesichter auflade und dann eine Beschreibung bekomme.
Ich habe einen Mockup erstellt, damit ich weiss, wie meine
Webseite aussehen soll …

Aber es gab noch ein anderes Problem: Mein KI-Modell ist in Python
geschrieben, und React kann keine Python-Dateien ausführen.
Darum habe ich entschieden, einen separaten Server für Python
zu erzeugen. Ich habe eine Spring-Boot-Applikation gemacht und
dort Python-Code ausgeführt und den Output als GET-Request
zurück an die Webseite gegeben.

Und noch ein Problem: Wie kriegt Spring-Boot-Server die
Fotos von den Gesichtern? Ich habe einfach mit POST-Request
die Foto-Datei an Spring-Server geschickt und dort mit gleichem
Namen überschrieben, damit es nur eine Datei gibt.
