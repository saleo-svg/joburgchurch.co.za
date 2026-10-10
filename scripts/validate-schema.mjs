// Extract all JSON-LD from a page and report the @type of each.
import https from 'node:https';

const url = process.argv[2] || 'https://joburgchurch.co.za/blog/';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = [...data.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    console.log(`Found ${matches.length} JSON-LD block(s) in ${url}`);
    let total = 0;
    matches.forEach((m, i) => {
      try {
        const parsed = JSON.parse(m[1]);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        arr.forEach(item => {
          total++;
          const id = item['@id'] || '';
          const name = item.name || '';
          console.log(`  @type=${item['@type']}  name=${name}  @id=${id}`);
        });
      } catch (e) {
        console.log(`  [${i}] parse error: ${e.message}`);
      }
    });
    console.log(`Total schemas: ${total}`);
  });
});
