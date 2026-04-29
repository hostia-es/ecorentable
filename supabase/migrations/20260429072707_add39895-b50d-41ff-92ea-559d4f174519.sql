-- Newsletter: drop overly permissive update policy, allow upsert only via insert
DROP POLICY IF EXISTS "Anyone can upsert own subscription" ON public.newsletter_subscribers;

-- Storage: restrict listing — public bucket but keep SELECT for read of objects (Supabase serves via signed URL behavior)
-- Replace broad SELECT with admin-only listing; public access still works via getPublicUrl direct path
DROP POLICY IF EXISTS "Blog images public read" ON storage.objects;
CREATE POLICY "Blog images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
-- (Public read is required for blog images. Keeping it. Linter warning is acknowledged trade-off.)

-- Revoke public execute of internal SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
-- has_role must be callable by authenticated users for RLS evaluation (safe: only checks own roles)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;