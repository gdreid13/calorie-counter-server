CREATE TABLE IF NOT EXISTS caloriecounter_users(
  id SERIAL PRIMARY KEY,
  user_name TEXT UNIQUE,
  email Text NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  isAdmin BOOLEAN,
  age TEXT,
  weight Text,
  gender Text,
  profilePic text,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);