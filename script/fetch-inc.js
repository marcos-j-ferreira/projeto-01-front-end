async function incrementarValue() {

    const res = await fetch("http://192.168.1.111:8080/inc");
    const text = await res.text();
    console.log("Resposta server:", text);
}

setInterval(incrementarValue(), 200)


