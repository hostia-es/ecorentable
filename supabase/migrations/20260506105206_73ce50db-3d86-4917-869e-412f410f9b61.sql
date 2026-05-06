UPDATE blog_posts SET image_url = replace(image_url, '-v2.png', '-v3.png'), updated_at = now()
WHERE image_url LIKE '%-v2.png';