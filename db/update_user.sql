update users
set display_name = $2, user_image = $3
where auth_id = $1
returning *