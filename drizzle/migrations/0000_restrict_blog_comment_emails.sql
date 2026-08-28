-- Remove public column access to author_email on blog_comments
REVOKE SELECT ON public.blog_comments FROM anon, authenticated;

GRANT SELECT (id, post_id, author_name, content, approved, created_at)
  ON public.blog_comments TO anon, authenticated;

GRANT INSERT (post_id, author_name, author_email, content)
  ON public.blog_comments TO anon, authenticated;

GRANT ALL ON public.blog_comments TO service_role;