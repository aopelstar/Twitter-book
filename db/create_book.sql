insert into books(book_size, book_price, draft, user_id) values($1, $2, $3, $4)

returning *