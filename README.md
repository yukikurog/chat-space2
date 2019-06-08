# README

# DB設計

## users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: ture|
|email|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|stirng|null: false|
|image|string|null: false|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null :false, unique :true|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: members 

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user