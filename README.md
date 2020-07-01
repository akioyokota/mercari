## cardsテーブル

|Column|Type|Options|
|-----|----|-------|
|card_id|integer|null: false|
|card_month|integer|null: false|
|card_year|integer|null: false|
|security_code|integer|null: false|
|user_id|integer|null: false,　foreign_key:true|

### Association
- belongs-to: user



## commentsテーブル

|Column|Type|Options|
|-----|----|-------|
|comment|text|null: false
|user_id|integer|null:false,　foreign_key:true|
|product_id|integer|null: false,　foreign_key:true|

### Association
- belongs-to: user
- belongs-to: product



## user_addressesテーブル

|Column|Type|Options|
|-----|----|-------|
|postal_code|integer|null: false|
|prefecture|integer|null:false|
|city|integer|null:false|
|address|integer|null:false|
|apartment|string||
|user_id|integer|null:false,　foreign_key:true|


### Association
- belongs-to: user
