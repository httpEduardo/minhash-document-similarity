import random
import re

TOKEN_RE = re.compile(r"[a-z0-9]+")


def tokenize(text):
    return set(TOKEN_RE.findall(text.lower()))


def _hash(seed, value):
    random.seed(hash((seed, value)))
    return random.randint(0, 2**31 - 1)


def minhash(signature_size, tokens):
    signature = []
    for i in range(signature_size):
        signature.append(min(_hash(i, token) for token in tokens) if tokens else 0)
    return signature


def compare(docs, hashes=64):
    tokens = [tokenize(doc) for doc in docs]
    signatures = [minhash(hashes, doc_tokens) for doc_tokens in tokens]

    def jaccard(a, b):
        if not a or not b:
            return 0.0
        return len(a & b) / len(a | b)

    def estimate(sig_a, sig_b):
        matches = sum(1 for a, b in zip(sig_a, sig_b) if a == b)
        return matches / len(sig_a) if sig_a else 0.0

    exact = jaccard(tokens[0], tokens[1]) if len(tokens) >= 2 else 0.0
    approx = estimate(signatures[0], signatures[1]) if len(signatures) >= 2 else 0.0
    return {
        "exact": round(exact, 4),
        "approx": round(approx, 4),
        "hashes": hashes,
    }
