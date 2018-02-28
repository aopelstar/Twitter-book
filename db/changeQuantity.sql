update cart
set quantity = $3
where user_id = $1 and book_id = $2

returning *