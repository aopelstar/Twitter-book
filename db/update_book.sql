update books
set book_title = $2, book_subtitle = $3, book_size = $4, book_color = $5, pages_format = $7, featured = $8, book_price = $9, draft = $10, back_text = $6
where book_id = $1

returning *