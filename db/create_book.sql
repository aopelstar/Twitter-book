insert into books(book_size, book_price, draft, user_id, featured) values($1, $2, $3, $4, $5)

returning *