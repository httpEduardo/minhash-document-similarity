# Minhash Document Similarity

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Minhash Document Similarity estimates Jaccard similarity between documents using MinHash signatures.

## Quick start

```bash
python -m minhash_document_similarity.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/compare` `{ "docs": ["...", "..."], "hashes": 64 }`

