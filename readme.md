<h1 align="center">work in progress next mamasound.fr website</h1>


tmp url : http://mamasound.wiseways.me/

_* personal & probono project using experimental libs ( & design )_

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

This app inherit a RS structure/boilerplate from [wpi-react-rs-sass-ssr](https://github.com/n8tz/wpi-react-rs-sass-ssr)<br/>
which inherit itself SSR & webpack from [wpi-react-hmr-ssr](https://github.com/n8tz/wpi-react-hmr-ssr)

See [webpack-inherit](https://github.com/n8tz/webpack-inherit)
