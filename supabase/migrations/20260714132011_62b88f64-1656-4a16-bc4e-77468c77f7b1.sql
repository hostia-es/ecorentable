
-- LEADS: remove política aberta, permite INSERT anônimo (formulários) e admin para o resto
DROP POLICY IF EXISTS "Allow full access to leads" ON public.leads;

CREATE POLICY "Anyone can submit leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

REVOKE ALL ON public.leads FROM anon;
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

-- EMAIL_LOGS: só admin
DROP POLICY IF EXISTS "Allow full access to email_logs" ON public.email_logs;

CREATE POLICY "Admins can manage email logs"
  ON public.email_logs FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

REVOKE ALL ON public.email_logs FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_logs TO authenticated;
GRANT ALL ON public.email_logs TO service_role;
