insert into cart
(book_id, user_id, quantity, book_price)
values ($1, $4, $2, $3)

returning *