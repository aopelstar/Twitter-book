select * from cart
join books on books.book_id = cart.book_id
where cart.user_id = $1
