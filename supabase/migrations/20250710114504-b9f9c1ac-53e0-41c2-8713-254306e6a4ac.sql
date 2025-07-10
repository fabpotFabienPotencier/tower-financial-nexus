-- Let's also make sure the profiles table has proper constraints
-- to prevent any data issues

-- Make sure profiles table has proper indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Ensure account numbers are unique
ALTER TABLE public.profiles ADD CONSTRAINT unique_account_number UNIQUE (account_number);

-- Make sure first_name and last_name can't be null (set defaults if needed)
UPDATE public.profiles SET first_name = 'User' WHERE first_name = '' OR first_name IS NULL;
UPDATE public.profiles SET last_name = '' WHERE last_name IS NULL;

-- Set better defaults for names
ALTER TABLE public.profiles ALTER COLUMN first_name SET DEFAULT 'User';
ALTER TABLE public.profiles ALTER COLUMN last_name SET DEFAULT '';