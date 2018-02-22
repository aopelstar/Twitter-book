create table booktweets
(tweet_id serial primary key
, book_id integer
, tweet_text text
, tweet_username varchar(180)
, tweet_screenname varchar(180)
, tweet_img1 text
, tweet_img2 text
, tweet_img3 text
, tweet_img4 text
, tweet_date text)