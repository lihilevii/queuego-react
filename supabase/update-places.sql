-- מחק את כל המקומות הישנים ושים חדשים
delete from queue_reports;
delete from favorites;
delete from places;

insert into places (name, category, emoji, rating) values
  ('משרד הפנים - תל אביב',         'Government',  '🏛️', 3.2),
  ('ביטוח לאומי - תל אביב',        'Government',  '🏢', 3.5),
  ('מס הכנסה - רמת גן',            'Government',  '🏦', 3.8),
  ('מרפאת כללית - דיזנגוף',        'Health',      '🏥', 4.2),
  ('מרפאת מכבי - תל אביב',         'Health',      '⚕️', 4.0),
  ('בית חולים איכילוב',            'Health',      '🏨', 4.5),
  ('דואר ישראל - תל אביב מרכז',   'Post Office', '📮', 3.6),
  ('דואר ישראל - גבעתיים',         'Post Office', '📮', 3.9),
  ('רשות הרישוי - תל אביב',        'DMV',         '🚗', 2.8),
  ('בנק הפועלים - דיזנגוף',        'Banks',       '🏦', 4.1),
  ('בנק לאומי - אבן גבירול',       'Banks',       '💳', 4.0),
  ('ספריית שרת - תל אביב',         'Education',   '📚', 4.8);
