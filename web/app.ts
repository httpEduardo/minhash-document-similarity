const results = document.getElementById("results") as HTMLDivElement;
const compareButton = document.getElementById("compareButton") as HTMLButtonElement;

function renderResult(data: { exact: number; approx: number; hashes: number }): void {
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
  const docs = (document.getElementById("docInput") as HTMLTextAreaElement).value;
  const hashes = parseInt((document.getElementById("hashInput") as HTMLInputElement).value, 10);
  fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docs, hashes }),
  })
    .then((res) => res.json())
    .then((data) => renderResult(data));
});
