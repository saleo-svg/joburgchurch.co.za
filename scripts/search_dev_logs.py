import os
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

target_bytes = b'C:\\Users\\Laptop\\Desktop\\Church-Site'
files = {
    'kfj': b'\xe5\xbc\x80\xe5\x8f\x91\xe8\xae\xb0\xe5\xbd\x95.md',
    'kfj_txt': b'\xe5\xbc\x80\xe5\x8f\x91\xe8\xae\xb0\xe5\xbd\x95.txt',
    'yhdh': b'\xe7\x94\xa8\xe6\x88\xb7\xe5\xaf\xb9\xe8\xaf\x9d\xe6\xb1\x87\xe6\x80\xbb.md',
    'yhdh_txt': b'\xe7\x94\xa8\xe6\x88\xb7\xe5\xaf\xb9\xe8\xaf\x9d\xe8\xae\xb0\xe5\xbd\x95.txt',
}
keywords = ['free', 'fee', 'korean', '\u514d\u8d39', '\u8d39\u7528', '\u6536\u8d39', '\u4e0d\u662f\u514d\u8d39']
for name, fn in files.items():
    p = target_bytes + b'\\' + fn
    if not os.path.exists(p):
        print(f'{name}: NOT FOUND')
        continue
    try:
        with open(p, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        print(f'{name}: error {e}')
        continue
    lines = content.split('\n')
    print(f'=== {name} ({len(content)} chars, {len(lines)} lines) ===')
    for i, line in enumerate(lines):
        ll = line.lower()
        for kw in keywords:
            if kw.lower() in ll:
                snippet = line.strip()[:250].encode('utf-8', errors='replace').decode('utf-8', errors='replace')
                print(f'  L{i}: {snippet}')
                break
    print()
