async function incrementarValue() {
    try {
        const res = await fetch("http://192.168.1.111:8080/inc");
        const text = await res.text();
        console.log("Resposta server:", text);
    } catch (err) {
        console.error("Erro ao chamar servidor:", err);
    }
}

setInterval(incrementarValue, 5000);
