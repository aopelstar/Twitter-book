update books
set book_title = $2, book_subtitle = $3, book_size = $4, book_color = $5, pages_format = $6, featured = $7, book_price = $8, draft = $9
where user_id = $1
returning *