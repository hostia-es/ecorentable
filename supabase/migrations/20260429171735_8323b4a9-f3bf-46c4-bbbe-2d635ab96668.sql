
CREATE TABLE public.blog_calendar_sync (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_slug text NOT NULL UNIQUE,
  sheet_fecha date,
  sheet_idea text,
  sheet_category text,
  sheet_city text,
  status text NOT NULL DEFAULT 'pending',
  error_message text,
  blog_post_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_calendar_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors manage calendar sync"
ON public.blog_calendar_sync
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TRIGGER update_blog_calendar_sync_updated_at
BEFORE UPDATE ON public.blog_calendar_sync
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
