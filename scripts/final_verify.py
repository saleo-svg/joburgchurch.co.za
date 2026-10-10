"""
Final verification of all contact info changes.
"""
import os
import re
import glob

print('=' * 70)
print('FINAL VERIFICATION SUMMARY')
print('=' * 70)

print()
print('1) English/general pages with contacts - Mr. Sim + Ms. Dora + Mr. Leo:')

pages = [
    ('dist/contact/index.html', 1, 1),
    ('dist/visit/index.html', 1, 1),
    ('dist/community-classes/korean/index.html', 1, 1),
    ('dist/community-classes/index.html', 1, 1),
    ('dist/free-korean-class-johannesburg/index.html', 1, 1),
    ('dist/youth-ministry-johannesburg-usecan/index.html', 1, 1),
    ('dist/free-bible-study-sandton/index.html', 1, 1),
    ('dist/online-bible-study-johannesburg/index.html', 1, 1),
    ('dist/youth-bible-study-johannesburg/index.html', 1, 0),
    ('dist/first-time-church-visitor-johannesburg/index.html', 1, 0),
    ('dist/what-to-wear-to-church-johannesburg/index.html', 1, 0),
    ('dist/churches-in-sandton/index.html', 1, 0),
    ('dist/marriage-counselling-johannesburg/index.html', 1, 1),
    ('dist/parenting-biblical-advice-johannesburg/index.html', 1, 1),
    ('dist/privacy/index.html', 1, 0),
]

all_ok = True
for path, min_sim, min_dora in pages:
    if not os.path.exists(path):
        print(f'  MISSING: {path}')
        all_ok = False
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    sim = c.count('wa.me/27774871295')
    dora = c.count('wa.me/27674424461')
    leo = c.count('wa.me/27792592607')
    ok = sim >= min_sim and dora >= min_dora and leo >= 1
    status = 'OK' if ok else 'FAIL'
    if not ok:
        all_ok = False
    short = path.replace('dist/', '')
    print(f'  [{status}] {short}: Sim:{sim} Dora:{dora} Leo:{leo}')

print()
print('2) Locations pages (dynamic):')
loc_paths = glob.glob('dist/locations/*/index.html')
total_sim = total_dora = total_leo = 0
for path in loc_paths:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    total_sim += c.count('wa.me/27774871295')
    total_dora += c.count('wa.me/27674424461')
    total_leo += c.count('wa.me/27792592607')
ok = total_sim >= 8 and total_dora >= 8 and total_leo >= 8
print(f'  [{("OK" if ok else "FAIL")}] Total across {len(loc_paths)} pages: Sim:{total_sim} Dora:{total_dora} Leo:{total_leo}')

print()
print('3) Chinese articles - ONLY Mr Leo (NO Mr. Sim, NO Ms. Dora):')
chinese_slugs = [
    'nanfei-huaren-jiaohui-zhunanjohannesburg-zhongwen-jidutuanfei',
    'nanfei-waipai-huaren-jidutuan-shenghuo-johannesburg',
    'taiwanese-christians-south-africa-johannesburg',
    'nanfei-huayi-erda-xinyang-shenfen-jiaohui',
    'nanfei-mianfei-xinli-zixun-huaren-jidutuan',
    'yuebao-huaren-libai-juhui-dian-zhinan',
    'nanfei-shengfen-huaren-jidutuan-ziyuan',
    'nanfei-huaren-hunyin-jiating-jiaohui',
    'nanfei-zuolibai-shicao-zhinan',
    'yuebao-huaren-chajingban-zhouwu',
    'nanfei-anquan-xinyang-jidutuan',
    'nanfei-zhichang-xinyang-jidutuan',
]
for slug in chinese_slugs:
    path = f'dist/blog/{slug}/index.html'
    if not os.path.exists(path):
        print(f'  MISSING: {slug}')
        all_ok = False
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    sim = c.count('wa.me/27774871295')
    dora = c.count('wa.me/27674424461')
    leo = c.count('wa.me/27792592607')
    ok = sim == 0 and dora == 0 and leo >= 1
    status = 'OK' if ok else 'FAIL'
    if not ok:
        all_ok = False
    print(f'  [{status}] {slug}: Sim:{sim} Dora:{dora} Leo:{leo}')

print()
print('4) Chinese markdown posts in src/content/posts/:')
for slug in chinese_slugs:
    path = f'src/content/posts/{slug}.md'
    if not os.path.exists(path):
        print(f'  MISSING: {slug}.md')
        all_ok = False
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    sim = c.count('wa.me/27774871295') + c.count('Mr. Sim')
    dora = c.count('wa.me/27674424461') + c.count('Ms. Dora')
    leo = c.count('wa.me/27792592607')
    has_leo_name = 'Mr Leo' in c
    ok = sim == 0 and dora == 0 and leo >= 1
    status = 'OK' if ok else 'FAIL'
    if not ok:
        all_ok = False
    print(f'  [{status}] {slug}.md: Sim:{sim} Dora:{dora} Leo:{leo} LeoName:{("YES" if has_leo_name else "NO")}')

print()
print('5) Broken HTML check:')
found_broken = False
for root, dirs, files in os.walk('src/pages'):
    for fname in files:
        if not fname.endswith('.astro'):
            continue
        path = os.path.join(root, fname)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        if '</p></p>' in content:
            print(f'  FAIL: {path}: contains </p></p>')
            found_broken = True
            all_ok = False
if not found_broken:
    print('  OK: No </p></p> broken tags')

print()
print('=' * 70)
print('FINAL RESULT:', 'ALL CHECKS PASSED' if all_ok else 'SOME CHECKS FAILED')
print('=' * 70)