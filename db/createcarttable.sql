create table cart
(cart_line serial primary key
, book_id integer
, user_id text
, quantity integer
, book_price numeric(10,2))