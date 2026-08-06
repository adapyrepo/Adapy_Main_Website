#!/usr/bin/env bash
# Safe sample request: creates a DRAFT article (never publicly visible).
# Replace TEST_KEY_PLACEHOLDER with the real ADAPY_BLOG_API_KEY (never commit it).
# For local testing use: BASE_URL=http://localhost:5000 ./scripts/sample-blog-publish.sh

BASE_URL="${BASE_URL:-https://adapy.com}"

curl -X POST "$BASE_URL/api/internal/blog/publish" \
  -H "Authorization: Bearer ${ADAPY_BLOG_API_KEY:-TEST_KEY_PLACEHOLDER}" \
  -H "Content-Type: application/json" \
  -d '{
    "externalId": "test-article-001",
    "title": "Testing Adapy Blog Publishing",
    "excerpt": "This is a test of the secure blog publishing connection.",
    "content": "<p>This is a test article.</p>",
    "contentFormat": "html",
    "author": { "name": "Adapy", "displayName": "Adapy Team" },
    "featuredImage": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/JPEG_example_flower.jpg/640px-JPEG_example_flower.jpg",
      "alt": "Adapy accessibility technology"
    },
    "categories": ["Adapy News"],
    "tags": ["Adapy"],
    "status": "draft"
  }'
