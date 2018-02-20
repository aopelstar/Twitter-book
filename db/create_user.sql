insert into users (
    auth_id, display_name, user_image
)
values (
    $1, $2, $3
)

returning *