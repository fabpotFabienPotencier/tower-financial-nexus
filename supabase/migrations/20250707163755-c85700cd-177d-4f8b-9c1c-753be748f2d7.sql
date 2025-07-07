
-- First, we need to drop the existing foreign key constraint on kyc_requests.user_id
-- and create a new one that references profiles.id instead of auth.users.id
ALTER TABLE public.kyc_requests 
DROP CONSTRAINT IF EXISTS kyc_requests_user_id_fkey;

-- Add the foreign key constraint to reference profiles table
ALTER TABLE public.kyc_requests 
ADD CONSTRAINT kyc_requests_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Do the same for transactions table to maintain consistency
ALTER TABLE public.transactions 
DROP CONSTRAINT IF EXISTS transactions_user_id_fkey;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
