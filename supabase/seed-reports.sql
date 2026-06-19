-- Seed queue reports with a demo user ID (will use auth.uid() placeholder)
-- First create a demo user entry or use existing user
-- Run this after getting a real user ID from auth.users

-- Get your user ID first:
-- select id from auth.users limit 5;

-- Then replace 'YOUR-USER-ID' below with the actual ID and run:

insert into queue_reports (place_id, user_id, level, notes, created_at) values
  -- ביטוח לאומי - תל אביב - עומס גבוה
  ('2d9f2fee-2214-4304-8e4d-88cd81cbe006', 'YOUR-USER-ID', 'high', 'תור של שעה לפחות, הביאו ספר', now() - interval '10 minutes'),

  -- בית חולים איכילוב - עומס בינוני
  ('b0152bbb-0236-4180-a06e-ebc7c4eb7c4d', 'YOUR-USER-ID', 'medium', 'מחלקת קבלה עמוסה, מחלקות אחרות בסדר', now() - interval '25 minutes'),

  -- בנק הפועלים - דיזנגוף - עומס נמוך
  ('b00f7db1-f758-4cc7-8709-f1b699653c82', 'YOUR-USER-ID', 'low', 'כמעט ריק, שירות מהיר', now() - interval '5 minutes'),

  -- דואר ישראל - תל אביב מרכז - עומס גבוה
  ('53964487-d504-4b9f-b26d-cb6504850889', 'YOUR-USER-ID', 'high', 'תור ארוך מאוד, מומלץ לבוא בבוקר', now() - interval '15 minutes'),

  -- דואר ישראל - גבעתיים - עומס בינוני
  ('87bc23b1-92bb-40d0-8f8c-6e79f38cae38', 'YOUR-USER-ID', 'medium', null, now() - interval '30 minutes'),

  -- מס הכנסה - רמת גן - עומס בינוני
  ('6115201d-66b2-4918-b784-7c0d1ef8c97d', 'YOUR-USER-ID', 'medium', 'תור ממוחשב, כדאי לקחת מספר', now() - interval '20 minutes'),

  -- מרפאת כללית - דיזנגוף - עומס נמוך
  ('9ec7bc38-0b36-4a21-9315-e684ae2b4b52', 'YOUR-USER-ID', 'low', 'רופא זמין, המתנה קצרה', now() - interval '8 minutes'),

  -- מרפאת מכבי - תל אביב - עומס גבוה
  ('f7d1c488-9863-4d14-b546-4f71c8f4bd20', 'YOUR-USER-ID', 'high', 'הרבה חולים, המתנה של 40 דקות', now() - interval '12 minutes'),

  -- משרד הפנים - תל אביב - עומס גבוה
  ('2a5f5fc7-d179-42e9-ae40-2f11716d2159', 'YOUR-USER-ID', 'high', 'עומס רב, לקחת מספר תור מראש', now() - interval '35 minutes'),

  -- רשות הרישוי - עומס בינוני
  ('a1694176-4239-4e88-9405-4c4bcc0bf174', 'YOUR-USER-ID', 'medium', null, now() - interval '18 minutes'),

  -- ספריית שרת - עומס נמוך
  ('79021b57-78b7-466a-a7f0-30d6660ad8d5', 'YOUR-USER-ID', 'low', 'שקט ונוח', now() - interval '45 minutes'),

  -- בנק לאומי - אבן גבירול - עומס נמוך
  ('f20f6814-1cc2-4acf-a701-5ae96609d157', 'YOUR-USER-ID', 'low', null, now() - interval '22 minutes');
