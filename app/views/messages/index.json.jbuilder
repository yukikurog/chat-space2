json.array! @new_messages do |message|
  json.id message.id
  json.body message.body
  json.image message.image.url
  json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
end