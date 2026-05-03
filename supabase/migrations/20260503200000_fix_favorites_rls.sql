-- Ensure the user_favorites table exists with the correct name and structure
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_favorites') THEN
        CREATE TABLE public.user_favorites (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            game_slug TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            UNIQUE (user_id, game_slug)
        );
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users manage own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can view own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON public.user_favorites;

-- Create comprehensive policy
CREATE POLICY "Users manage own favorites" ON public.user_favorites
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Ensure play_history is also correct
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'play_history') THEN
        CREATE TABLE public.play_history (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            game_slug TEXT NOT NULL,
            played_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    END IF;
END $$;

ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own history" ON public.play_history;

CREATE POLICY "Users manage own history" ON public.play_history
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
