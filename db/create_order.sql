insert into bookorders
(user_id, address, city, state, zip_code, order_total, email, phone, order_date)
values ($1,$3,$4,$5,$6,$7,$8,$9,$2)

returning *