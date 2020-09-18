CREATE TABLE IF NOT EXISTS meals(
    id SERIAL PRIMARY KEY,
<<<<<<< HEAD
    userId INTEGER references caloriecounter_users(user_name) ON DELETE CASCADE NOT NULL,    
    alldaycalories text,
=======
    userId INTEGER references caloriecounter_users(id) ON DELETE CASCADE NOT NULL,    
    alldaycalories text NOT NULL,
>>>>>>> 7f31168d6ba11da660f813b5c603fb115cc72b72
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_modified TIMESTAMPTZ
);