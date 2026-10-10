"""Generate all 80 articles fresh (assumes clean [slug].astro + sitemap)."""
import importlib.util
spec = importlib.util.spec_from_file_location("g", "scripts/generate-80-drafts.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

# Run the full gen
m.run()
