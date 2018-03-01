update books
set book_title = $2, book_subtitle = $3, user_id = $4, book_size = $5, book_color = $6, back_text = $7, pages_format = $8, featured = $9, book_price = $10, draft = $11, book_text_color=$12
where book_id = $1

returning *