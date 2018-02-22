create table bookorders
(order_id serial primary key
, user_id integer
, order_total numeric(10, 2)
, order_date text)