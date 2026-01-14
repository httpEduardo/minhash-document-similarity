"use strict";
const results = document.getElementById("results");
const compareButton = document.getElementById("compareButton");
function renderResult(data) {
    results.innerHTML = "";
    const items = [
        `Exact Jaccard: ${data.exact}`,
        `Approx Jaccard: ${data.approx}`,
        `Hash functions: ${data.hashes}`,
    ];
    items.forEach((text) => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.textContent = text;
        results.appendChild(card);
    });
}
compareButton.addEventListener("click", () => {
    const docs = document.getElementById("docInput").value;
    const hashes = parseInt(document.getElementById("hashInput").value, 10);
    fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docs, hashes }),
    })
        .then((res) => res.json())
        .then((data) => renderResult(data));
});
