CREATE TABLE IF NOT EXISTS meals(
    id SERIAL PRIMARY KEY,
    userId text references caloriecounter_users(user_name) ON DELETE CASCADE NOT NULL,    
    alldaycalories text,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_modified TIMESTAMPTZ
);