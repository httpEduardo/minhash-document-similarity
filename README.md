# MinHashMesh

MinHashMesh estimates Jaccard similarity between documents using MinHash signatures.

## Quick start

```bash
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/compare` `{ "docs": ["...", "..."], "hashes": 64 }`

