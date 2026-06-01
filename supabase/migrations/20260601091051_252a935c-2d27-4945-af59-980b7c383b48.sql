DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT jobid, jobname FROM cron.job WHERE command ILIKE '%sync-blog-calendar%' OR command ILIKE '%generate-seo-content%' OR command ILIKE '%generate-post-image%' OR command ILIKE '%backfill-blog-images%'
  LOOP
    PERFORM cron.unschedule(r.jobid);
  END LOOP;
END$$;