import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

target = r'C:\Users\Laptop\.cursor\projects\c-Users-Laptop-Desktop-Church-Site\agent-transcripts'
keywords = ['free', 'fee', 'korean', '免费', '费用', '不是免费']
for d in sorted(os.listdir(target)):
    full = os.path.join(target, d)
    if not os.path.isdir(full):
        continue
    jsonl = os.path.join(full, d + '.jsonl')
    if not os.path.exists(jsonl):
        continue
    print(f'\n========== {d} ==========')
    with open(jsonl, 'r', encoding='utf-8', errors='replace') as f:
        for i, line in enumerate(f):
            ll = line.lower()
            for kw in keywords:
                if kw.lower() in ll:
                    snippet = line.strip()[:300].encode('utf-8', errors='replace').decode('utf-8', errors='replace')
                    print(f'  L{i}: {snippet}')
                    break
