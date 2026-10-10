import os, glob

posts = (glob.glob('src/content/posts/nanfei-*.md') +
         glob.glob('src/content/posts/taiwanese-*.md') +
         glob.glob('src/content/posts/yuebao-*.md'))

print(f"Found {len(posts)} Chinese articles\n")

for f in sorted(posts):
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    leo = '+27 79 259 2607' in c or 'wa.me/27792592607' in c
    sim = 'wa.me/27774871295' in c or 'Mr. Sim' in c
    dora = 'wa.me/27674424461' in c or 'Ms. Dora' in c
    name = os.path.basename(f)
    leo_s = 'YES' if leo else 'NO'
    sim_s = 'YES' if sim else 'NO'
    dora_s = 'YES' if dora else 'NO'
    print(f'{name}: Leo={leo_s} Sim={sim_s} Dora={dora_s}')
