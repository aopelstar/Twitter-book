select * from bookorders
inner join orderlines on bookorders.order_id = orderlines.order_id
where user_id = $1
order by order_id desc