insert into booktweets
(user_img, tweet_username, tweet_screenname, tweet_text, tweet_img1, tweet_img2, tweet_img3, tweet_img4, tweet_date, user_id)
values ($1,$2,$3,$4,$5,$6,$7,$8,$10,$9)

returning *