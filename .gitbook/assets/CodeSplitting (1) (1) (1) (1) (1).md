# Code Splitting

Rather than all code living in a single file, we can split the code up into different files and only load the code that we need for a given page. Here is how we can accomplish this in our project using [loadable-components](https://loadable-components.com/docs/server-side-rendering/).

---

## Server

### server.webpack.config.js

Add LoadablePlugin.

```js
const LoadablePlugin = require('@loadable/webpack-plugin');

...

plugins: [new LoadablePlugin({
    filename: 'loadable-stats-server.json'
})],
```

### server/server.js

Use ChunkExtractor to get all the chunks, then put the script tags in the body and the link / style tags in the document head.

```js
import {
    ChunkExtractor
} from '@loadable/server';

...

const extractor = new ChunkExtractor({
    statsFile: './loadable-stats.json',
});

const jsx = extractor.collectChunks( < AppRoot path = {
            path
        }
        Router = {
            StaticRouter
        }
        />);

        ...

        const renderedAppHtml = ReactDOMServer.renderToString(jsx);

        ...

        html = assertReplace(
            html,
            '<div id="root"></div>',
            `<div id="root">${renderedAppHtml}</div>${extractor.getScriptTags()}`
        );

        html = assertReplace(
            html,
            '<head>',
            `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${extractor.getLinkTags()}${extractor.getStyleTags()}`
        );
```

---

## Client

### craco.config.js

Add LoadablePlugin. Then add HtmlWebpackPlugin and alter the webpack config to opt-out of the default CRA behavior that injects compiled chunks into the index.html template. We will control this ourselves manually.

```js
const LoadablePlugin = require('@loadable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

...

webpack: {
    mode: 'development',
    configure: (webpackConfig, {
        env
    }) => {
        // Prevent webpack from injecting script tags into index.html template because
        // we add the tags via the `@loadable` library for code-splitting. If we didn't
        // do this the same tags will be added twice.
        if (env !== 'development') {
            const htmlWebpackPluginInstance = webpackConfig.plugins.find(
                webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
            );
            if (htmlWebpackPluginInstance) {
                htmlWebpackPluginInstance.options.inject = false;
            }
        }

        Object.assign(webpackConfig.output, {
            filename: '[name].js',
            chunkFilename: 'static/js/[name].js',
        });

        return webpackConfig;
    },
    plugins: [new LoadablePlugin()],
},
```

### index.js

After all chunks are ready we can hydrate / render the App.

> Loadable components loads all your scripts asynchronously to ensure optimal performances. All scripts are loaded in parallel, so you have to wait for them to be ready using loadableReady.

```js
import {
    loadableReady
} from '@loadable/component';

...

loadableReady(() => {
            // HTML element to place the app into
            const rootElement = document.getElementById('root');

            renderFunction( < AppRoot path = {
                    window.location.pathname
                }
                Router = {
                    BrowserRouter
                }
                />, rootElement);
            });
```
