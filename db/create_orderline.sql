insert into orderlines
(order_id, book_id, quantity, book_price)
values ($1,$2,$3,(select book_price from books where book_id = $2))