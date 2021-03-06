# 時間軸
タイムラインは、[ノート](./note)が時系列で表示される機能です。 タイムラインには以下で示す種類があり、種類によって表示されるノートも異なります。 なお、タイムラインの種類によってはサーバーにより無効になっている場合があります。

## 首頁
自分のフォローしているユーザーの投稿が流れます。HTLと略されます。

## 本地
全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。LTLと略されます。

## 社群
自分のフォローしているユーザーの投稿と、全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。STLと略されます。

## 公開
全てのローカルユーザーの「ホーム」指定されていない投稿と、サーバーに届いた全てのリモートユーザーの「ホーム」指定されていない投稿が流れます。GTLと略されます。

## 對比
| ソース          |     |    | 時間軸 |    |    |
| ------------ | --- | -- | --- | -- | -- |
| 使用者          | 可見性 | 首頁 | 本地  | 社群 | 公開 |
| ローカル (フォロー)  | 發佈  | ✔  | ✔   | ✔  | ✔  |
|              | 首頁  | ✔  |     | ✔  |    |
|              | 追隨者 | ✔  | ✔   | ✔  | ✔  |
| リモート (フォロー)  | 發佈  | ✔  |     | ✔  | ✔  |
|              | 首頁  | ✔  |     | ✔  |    |
|              | 追隨者 | ✔  |     | ✔  | ✔  |
| ローカル (未フォロー) | 發佈  |    | ✔   | ✔  | ✔  |
|              | 首頁  |    |     |    |    |
|              | 追隨者 |    |     |    |    |
| リモート (未フォロー) | 發佈  |    |     |    | ✔  |
|              | 首頁  |    |     |    |    |
|              | 追隨者 |    |     |    |    |
