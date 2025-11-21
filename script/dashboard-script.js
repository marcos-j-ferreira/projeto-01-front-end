const API_URL = "http://192.168.1.111:8080";

    // 🔹 Função para chamar /inc
    async function increment() {
        await fetch(`${API_URL}/inc`)
            .then(() => console.log("Incrementado!"))
            .catch(err => console.error(err));
    }

    // 🔹 Gráfico Chart.js
    const ctx = document.getElementById("chart").getContext("2d");

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Requisições por intervalo (5s)",
                data: [],
                borderWidth: 2,
                borderColor: "#1a73e8",
                backgroundColor: "rgba(26,115,232,0.2)",
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 🔹 Atualiza os dados a cada 2 segundos
    async function fetchValues() {
        try {
            const res = await fetch(`${API_URL}/values`);
            const data = await res.json();

            chart.data.labels = data.map((_, i) => `T${i + 1}`);
            chart.data.datasets[0].data = data;
            chart.update();

            updateStats(data);

        } catch (err) {
            console.error("Erro ao buscar valores:", err);
        }
    }

    // 🔹 Estatísticas
    function updateStats(values) {
        if (values.length === 0) return;

        const total = values.reduce((a, b) => a + b, 0);
        const last = values[values.length - 1];
        const avg = (total / values.length).toFixed(2);

        document.getElementById("stat-total").textContent = total;
        document.getElementById("stat-avg").textContent = avg;
        document.getElementById("stat-last").textContent = last;
        document.getElementById("stat-count").textContent = values.length;
    }

    // Atualiza automaticamente
    setInterval(fetchValues, 5000);
    fetchValues();