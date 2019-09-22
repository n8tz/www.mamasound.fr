<h1 align="center">work in progress next mamasound.fr website</h1>
<p align="center">React SPA & CMS, with full SSR, including slideables, async data & metas</p>


tmp url : http://mamasound.wiseways.me/

_* this is personal & probono project using experimental libs ( & design )_
_* so this is NOT corporate grade code _

## How to start

### using docker-compose

```
docker-compose up
```

& start browser at localhost:8080

### using local setup

#### setup
```
npm i
```

#### dev
```
npm run start-dev
npm run runBrowser
```

#### prod
```
npm run build
npm run start
```

## Code structure

This app inherit the base boilerplate & webpack config from [wi-layer-react-express](https://github.com/n8tz/wi-layer-react-express)

See [webpack-inherit](https://github.com/n8tz/webpack-inherit)
