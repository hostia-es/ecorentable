
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS cover_image_url text,
  ADD COLUMN IF NOT EXISTS language text,
  ADD COLUMN IF NOT EXISTS is_published boolean,
  ADD COLUMN IF NOT EXISTS scheduled_for timestamptz,
  ADD COLUMN IF NOT EXISTS source text;

UPDATE public.blog_posts SET is_published = published WHERE is_published IS NULL;

CREATE OR REPLACE FUNCTION public.sync_blog_posts_published()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_published IS DISTINCT FROM OLD.is_published AND NEW.is_published IS NOT NULL THEN
    NEW.published := NEW.is_published;
  ELSIF NEW.published IS DISTINCT FROM OLD.published THEN
    NEW.is_published := NEW.published;
  END IF;
  IF NEW.cover_image_url IS DISTINCT FROM COALESCE(OLD.cover_image_url,'') AND NEW.cover_image_url IS NOT NULL AND (NEW.image_url IS NULL OR NEW.image_url = '') THEN
    NEW.image_url := NEW.cover_image_url;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_blog_posts_published ON public.blog_posts;
CREATE TRIGGER trg_sync_blog_posts_published
BEFORE INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.sync_blog_posts_published();
