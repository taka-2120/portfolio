#!/usr/bin/env bash
# Merges the per-locale Ignite Build/en and Build/ja output into a single
# deployable directory.
#
# Ignite's CSS <link> tags are correctly locale-prefixed (e.g. "/ja/css/...")
# so css/ and fonts/ are kept nested under each locale untouched (fonts are
# referenced relatively from css via "../fonts/...", so they must move
# together). But the auto-injected <script> tags (bootstrap, ignite-core,
# syntax-highlighting) use root-absolute paths like "/js/..." regardless of
# the site's own base URL - that's a quirk in Ignite's Body element - so js/
# additionally needs a copy at the deploy root.
set -euo pipefail

BUILD_DIR="Build"
OUT_DIR="Deploy"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

for lang in en ja; do
	cp -R "$BUILD_DIR/$lang" "$OUT_DIR/$lang"
done

# Root-level copy of js/ to satisfy the unprefixed <script src="/js/..."> tags.
# Content is byte-identical between locales, so either copy will do.
cp -R "$BUILD_DIR/en/js" "$OUT_DIR/js"

echo "Merged output written to $OUT_DIR/"
