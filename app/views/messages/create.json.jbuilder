json.text @message.body
json.image @message.image
json.time @message.created_at
json.user_id @message.user.id
json.name @message.user.name