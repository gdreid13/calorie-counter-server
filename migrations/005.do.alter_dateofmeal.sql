ALTER TABLE meals ALTER COLUMN dateofmeal TYPE DATE;

ALTER TABLE meals ALTER COLUMN dateofmeal SET NOT NULL;

ALTER TABLE meals ALTER COLUMN breakfast_calories TYPE INTEGER;
ALTER TABLE meals ALTER COLUMN lunch_calories TYPE INTEGER;
ALTER TABLE meals ALTER COLUMN dinner_calories TYPE INTEGER;
ALTER TABLE meals ALTER COLUMN alldaycalories TYPE INTEGER;