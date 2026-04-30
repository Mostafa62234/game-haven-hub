
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
-- has_role still needs to be callable from RLS policies (which use the SECURITY DEFINER bypass), so authenticated keeps EXECUTE
