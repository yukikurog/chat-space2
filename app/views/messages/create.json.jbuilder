json.text @message.body
json.image @message.image.url
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_id @message.user.id
json.name @message.user.name
json.id @message.id