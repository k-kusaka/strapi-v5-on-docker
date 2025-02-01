# strapi-v5-on-docker
## はじめに
このプロジェクトでは、Docker上でStrapi、MySQL、Nginxを立ち上げ、素早くStrapiを利用できる環境を構築することができます。

## 環境情報
| 名称       | バージョン               |
|------------|--------------------------|
| Strapi     | 5.8.1                   |
| MySQL      | 8.0                      |
| Nginx      | 1.26.2                   |
| Node.js    | 18.0.0 ~ 22.x.x         |
| React.js   | 18.0.0                   |

## クイックスタートガイド
このセクションでは、起動手順について説明します。

1. .envファイルを作成する
2. docker-composeで起動する

### 1. envファイルの作成
プロジェクトのルートディレクトリ直下に、.envファイルを作成してください。下記の.envファイルは一例であるため、必要に応じて各パラメータ値を変更してください。
```
# Service
SERVICE_NAME=sample

# Env
NODE_ENV=development
DEBUG_MODE=false

# Server
STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337
STRAPI_SERVER_NAME=example.com

# Secrets
APP_KEYS=jPj8et6ZE0piSTxFaEWJ9g==,gC8xvjk3xUvKyurG8ZxnoQ==,gX02WANUadWjEfhv76exLw==,fZuvYg7oc3UOp3+zKvEn8Q==
API_TOKEN_SALT=QXJOIuAUF5ezdr9HqKmeEw==
JWT_SECRET=ZBC39RLYulgR/cXPw/nc5w==
ADMIN_JWT_SECRET=UsBC9tW0lyI6dGTq5giKgg==
TRANSFER_TOKEN_SALT=0gMD3gcNdUmvHnEevU/Cow==

# Database
STRAPI_DATABASE_CLIENT=mysql
STRAPI_DATABASE_HOST=127.0.0.1
STRAPI_DATABASE_PORT=3306
STRAPI_DATABASE_NAME=strapi
STRAPI_DATABASE_USERNAME=admin
STRAPI_DATABASE_PASSWORD=password
STRAPI_DATABASE_SSL=false

# SSL
STRAPI_SSL_CERT_KEY=example.com-key.pem
STRAPI_SSL_CERT=example.com.pem
```

| 名称       | 説明 | 例 |
|------------|------------|------------|
|SERVICE_NAME|本プロジェクトで立ち上がる各コンテナ名のプレフィックスに設定される値です|sample|
|NODE_ENV|開発環境では"development"を、本番環境では"production"を設定してください。|development|
|DEBUG_MODE|Strapiのログを出力する場合は"true"を、出力しない場合は"false"を設定してください。|false|
|STRAPI_HOST|Strapiに設定するホスト名を設定する項目ですが、今回はDockerで起動するため、"0.0.0.0"の固定値を設定します。|0.0.0.0|
|STRAPI_PORT|Strapiを立ち上げる場合のポート番号を設定してください。|1337|
|STRAPI_SERVER_NAME|Strapiにアクセスするホスト名を設定してください。|example.com|
|APP_KEYS|セッションクッキーの署名に利用する秘密鍵です。"openssl rand -base64 16"で発行した値を設定すると良いでしょう。|"${openssl rand -base64 16},${openssl rand -base64 16},${openssl rand -base64 16},${openssl rand -base64 16}"|
|API_TOKEN_SALT|トークンソルトです。"openssl rand -base64 16"で発行した値を設定すると良いでしょう。|"${openssl rand -base64 16}"|
|JWT_SECRET|Users-Permissions プラグインの JWT に署名するために使用されるシークレットです。"openssl rand -base64 16"で発行した値を設定すると良いでしょう。|"${openssl rand -base64 16}"|
|ADMIN_JWT_SECRET|管理パネルの JWT に署名するために使用されるシークレットです。"openssl rand -base64 16"で発行した値を設定すると良いでしょう。|"${openssl rand -base64 16}"|
|TRANSFER_TOKEN_SALT|トークンソルトです。"openssl rand -base64 16"で発行した値を設定すると良いでしょう。|"${openssl rand -base64 16}"|
|STRAPI_DATABASE_CLIENT|データベースのクライアント種別を設定します。本プロジェクトではMySQLを使用するため、"mysql"を固定値で設定します。|mysql|
|STRAPI_DATABASE_HOST|データベースへ接続するホスト名を設定します。本プロジェクトではDockerコンテナ内で扱うため、"127.0.0.1"を固定値で設定します。|127.0.0.1|
|STRAPI_DATABASE_PORT|データベースのポート番号を設定します。任意のポート番号を指定してください。|3306|
|STRAPI_DATABASE_NAME|データベースの名称を設定します。今回は"strapi"を固定値で設定します。|strapi|
|STRAPI_DATABASE_USERNAME|データベースで接続するユーザ名を設定します。任意のユーザー名を設定してください。|admin|
|STRAPI_DATABASE_PASSWORD|データベースで接続するパスワードを設定します。任意のパスワードを設定してください。|password|
|STRAPI_DATABASE_SSL|データベースのSSLの有効有無を設定します。今回は暗号化しないため、"false"を設定します。|false|
|STRAPI_SSL_CERT_KEY|SSL証明書の秘密鍵ファイル名を設定します。|example.com-key.pem|
|STRAPI_SSL_CERT|SSL証明書ファイル名を設定します。|example.com.pem|

### 2. docker-composeで起動する
```
% docker-compose up -d
```

## 付録
### Keyの作成方法
```
% openssl rand -base64 16
QLgOuuABMlGx2Wh9I/i6SA==
```

### hostsの設定方法
```
% sudo vi /etc/hosts
127.0.0.1	example.com
```

### 自己署名証明書の作成方法
```
% brew install mkcert
% mkcert -install
% mkcert example.com
% ls
example.com-key.pem	example.com.pem
```