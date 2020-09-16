CREATE TABLE IF NOT EXISTS caloriecounter_users(
  id SERIAL PRIMARY KEY,
  user_name TEXT UNIQUE,  
  full_name TEXT NOT NULL,
  isAdmin BOOLEAN DEFAULT false,  
  age TEXT NOT NULL,
  height Text NOT NULL,
  weight Text NOT NULL,
  gender Text,
  profile_pic text,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);