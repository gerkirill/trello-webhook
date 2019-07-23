## Goal:

Trello automation over API and web-hooks

## Docs:

https://unix.stackexchange.com/questions/478999/how-can-i-make-an-executable-run-as-a-service
https://www.freedesktop.org/software/systemd/man/systemd.service.html
https://www.freedesktop.org/software/systemd/man/systemd.exec.html#

## Learnt:

- cote micro-services with and w/o redis
- dotenv, dotenvenc
- system.d with restart and dependencies
- nexe to (cross)compile into executable
- securing redis w/ password
- simple server w/o express
- reading nodejs server/request/response documentation
- require('util').debuglog, NODE_DEBUG=...
- eslint integration with prettier
- project-level VScode settings

Code to create webhook manually:

```
curl -X "POST" 'https://api.trello.com/1/tokens/[TOKEN]/webhooks/?key=[KEY]&idModel=5ccadbf8b2690760ce8f5912&description="My Webhook"&callbackURL=http://moydomen.com:2018/trello'

{
    "id": "5d362731b3086719fb688de6",
    "description": "My Webhook",
    "idModel": "5ccadbf8b2690760ce8f5912",
    "callbackURL": "http://moydomen.com:2018/trello",
    "active": true
}
```

## Hints:

- run `npm run env:decrypt <password>` to recover .env file from encrypted version
- run `npm run env:encrypt <password>` to re-generate .env.enc file from .env file

## TODO

- Make server include request path (e.g. /trello -> trello) into event name
