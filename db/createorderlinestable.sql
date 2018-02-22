create table orderlines
(line_id serial primary key
, order_id integer
, book_id integer
, quantity integer
, book_price numeric(10, 2))