# 🕸 Webpack

## Concepts | webpack

> #### Excerpt
>
> **webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.**

---

Originally, chunks (and modules imported inside them) were connected by a parent-child relationship in the internal webpack graph. The `CommonsChunkPlugin` was used to avoid duplicated dependencies across them, but further optimizations were not possible.

Since webpack v4, the `CommonsChunkPlugin` was removed in favor of `optimization.splitChunks`.

### Defaults

Out of the box `SplitChunksPlugin` should work well for most users.

By default it only affects on-demand chunks, because changing initial chunks would affect the script tags the HTML file should include to run the project.

Webpack will automatically split chunks based on these conditions:

- New chunk can be shared OR modules are from the `node_modules` folder
- New chunk would be bigger than 20kb (before min+gz)
- Maximum number of parallel requests when loading chunks on demand would be lower or equal to 30
- Maximum number of parallel requests at initial page load would be lower or equal to 30

When trying to fulfill the last two conditions, bigger chunks are preferred.

### Configuration

Webpack provides a set of options for developers that want more control over this functionality.

### optimization.splitChunks

This configuration object represents the default behavior of the `SplitChunksPlugin`.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

#### splitChunks.automaticNameDelimiter

`string = '~'`

By default webpack will generate names using origin and name of the chunk (e.g. `vendors~main.js`). This option lets you specify the delimiter to use for the generated names.

#### splitChunks.chunks

`string = 'async'` `function (chunk)`

This indicates which chunks will be selected for optimization. When a string is provided, valid values are `all`, `async`, and `initial`. Providing `all` can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks.

Note that it is applied to the fallback cache group as well (`splitChunks.fallbackCacheGroup.chunks`).

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {

      chunks: 'all',
    },
  },
};
```

Alternatively, you may provide a function for more control. The return value will indicate whether to include each chunk.

```
module.exports = {

  optimization: {
    splitChunks: {
      chunks(chunk) {

        return chunk.name !== 'my-excluded-chunk';
      },
    },
  },
};
```

#### splitChunks.maxAsyncRequests

`number = 30`

Maximum number of parallel requests when on-demand loading.

#### splitChunks.maxInitialRequests

`number = 30`

Maximum number of parallel requests at an entry point.

#### splitChunks.defaultSizeTypes

`[string] = ['javascript', 'unknown']`

Sets the size types which are used when a number is used for sizes.

#### splitChunks.minChunks

`number = 1`

The minimum times must a module be shared among chunks before splitting.

#### splitChunks.hidePathInfo

`boolean`

Prevents exposing path info when creating names for parts splitted by maxSize.

#### splitChunks.minSize

`number = 20000` `{ [index: string]: number }`

Minimum size, in bytes, for a chunk to be generated.

#### splitChunks.minSizeReduction

`number` `{ [index: string]: number }`

Minimum size reduction to the main chunk (bundle), in bytes, needed for a chunk to be generated. Meaning if splitting into a chunk does not reduce the size of the main chunk (bundle) by the given amount of bytes, it won't be split, even if it meets the `splitChunks.minSize` value.

#### splitChunks.enforceSizeThreshold

**`splitChunks.cacheGroups.{cacheGroup}.enforceSizeThreshold`**

`number = 50000`

Size threshold at which splitting is enforced and other restrictions (minRemainingSize, maxAsyncRequests, maxInitialRequests) are ignored.

#### splitChunks.minRemainingSize

**`splitChunks.cacheGroups.{cacheGroup}.minRemainingSize`**

`number = 0`

`splitChunks.minRemainingSize` option was introduced in webpack 5 to avoid zero sized modules by ensuring that the minimum size of the chunk which remains after splitting is above a limit. Defaults to `0` in ['development' mode](https:
//webpack.js.org/configuration/mode/#mode-development). For other cases `splitChunks.minRemainingSize` defaults to the value of `splitChunks.minSize` so it doesn't need to be specified manually except for the rare cases where deep control is required.

#### splitChunks.layer

**`splitChunks.cacheGroups.{cacheGroup}.layer`**

`RegExp` `string` `function`

Assign modules to a cache group by module layer.

#### splitChunks.maxSize

`number = 0`

Using `maxSize` (either globally `optimization.splitChunks.maxSize` per cache group `optimization.splitChunks.cacheGroups[x].maxSize` or for the fallback cache group `optimization.splitChunks.fallbackCacheGroup.maxSize`) tells webpack to try to split chunks bigger than `maxSize` bytes into smaller parts. Parts will be at least `minSize` (next to `maxSize`) in size. The algorithm is deterministic and changes to the modules will only have local effects. So that it is usable when using long term caching and doesn't require records. `maxSize` is only a hint and could be violated when modules are bigger than `maxSize` or splitting would violate `minSize`.

When the chunk has a name already, each part will get a new name derived from that name. Depending on the value of `optimization.splitChunks.hidePathInfo` it will add a key derived from the first module name or a hash of it.

`maxSize` option is intended to be used with HTTP/2 and long term caching. It increases the request count for better caching. It could also be used to decrease the file size for faster rebuilding.

#### splitChunks.maxAsyncSize

`number`

Like `maxSize`, `maxAsyncSize` can be applied globally (`splitChunks.maxAsyncSize`), to cacheGroups (`splitChunks.cacheGroups.{cacheGroup}.maxAsyncSize`), or to the fallback cache group (`splitChunks.fallbackCacheGroup.maxAsyncSize`).

The difference between `maxAsyncSize` and `maxSize` is that `maxAsyncSize` will only affect on-demand loading chunks.

#### splitChunks.maxInitialSize

`number`

Like `maxSize`, `maxInitialSize` can be applied globally (`splitChunks.maxInitialSize`), to cacheGroups (`splitChunks.cacheGroups.{cacheGroup}.maxInitialSize`), or to the fallback cache group (`splitChunks.fallbackCacheGroup.maxInitialSize`).

The difference between `maxInitialSize` and `maxSize` is that `maxInitialSize` will only affect initial load chunks.

#### splitChunks.name

`boolean = false` `function (module, chunks, cacheGroupKey) => string` `string`

Also available for each cacheGroup: `splitChunks.cacheGroups.{cacheGroup}.name`.

The name of the split chunk. Providing `false` will keep the same name of the chunks so it doesn't change names unnecessarily. It is the recommended value for production builds.

Providing a string or a function allows you to use a custom name. Specifying either a string or a function that always returns the same string will merge all common modules and vendors into a single chunk. This might lead to bigger initial downloads and slow down page loads.

If you choose to specify a function, you may find the `chunk.name` and `chunk.hash` properties (where `chunk` is an element of the `chunks` array) particularly useful in choosing a name for your chunk.

If the `splitChunks.name` matches an [entry point](https:
//webpack.js.org/configuration/entry-context/#entry) name, the entry point will be removed.

**main.js**

```typescript
import _ from "lodash";

console.log(_.join(["Hello", "webpack"], " "));
```

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,

          name(module, chunks, cacheGroupKey) {

const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);

const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        },
      },
    },
  },
};
```

Running webpack with following `splitChunks` configuration would also output a chunk of the group common with next name: `commons-main-lodash.js.e7519d2bb8777058fa27.js` (hash given as an example of real world output).

#### splitChunks.usedExports

**`splitChunks.cacheGroups{cacheGroup}.usedExports`**

`boolean = true`

Figure out which exports are used by modules to mangle export names, omit unused exports and generate more efficient code. When it is `true`: analyse used exports for each runtime, when it is `"global"`: analyse exports globally for all runtimes combined).

#### splitChunks.cacheGroups

Cache groups can inherit and/or override any options from `splitChunks.*`; but `test`, `priority` and `reuseExistingChunk` can only be configured on cache group level. To disable any of the default cache groups, set them to `false`.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  },
};
```

**`splitChunks.cacheGroups.{cacheGroup}.priority`**

`number = -20`

A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher `priority`. The default groups have a negative priority to allow custom groups to take higher priority (default value is `0` for custom groups).

**`splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk`**

`boolean = true`

If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can affect the resulting file name of the chunk.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

**`splitChunks.cacheGroups.{cacheGroup}.type`**

`function` `RegExp` `string`

Allows to assign modules to a cache group by module type.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        json: {
          type: 'json',
        },
      },
    },
  },
};
```

**splitChunks.cacheGroups.test**

**`splitChunks.cacheGroups.{cacheGroup}.test`**

`function (module, { chunkGraph, moduleGraph }) => boolean` `RegExp` `string`

Controls which modules are selected by this cache group. Omitting it selects all modules. It can match the absolute module resource path or chunk names. When a chunk name is matched, all modules in the chunk are selected.

Providing a function to`{cacheGroup}.test`:

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        svgGroup: {
          test(module) {



const path = require('path');
            return (
              module.resource &&
              module.resource.endsWith('.svg') &&
              module.resource.includes(`${path.sep}cacheable_svgs${path.sep}`)
            );
          },
        },
        byModuleTypeGroup: {
          test(module) {
            return module.type === 'javascript/auto';
          },
        },
      },
    },
  },
};
```

In order to see what information is available in `module` and `chunks` objects, you can put `debugger;` statement in the callback. Then [run your webpack build in debug mode](https:
//webpack.js.org/contribute/debugging/#devtools) to inspect the parameters in Chromium DevTools.

Providing a `RegExp` to `{cacheGroup}.test`:

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {

          test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/,
        },
      },
    },
  },
};
```

**`splitChunks.cacheGroups.{cacheGroup}.filename`**

`string` `function (pathData, assetInfo) => string`

Allows to override the filename when and only when it's an initial chunk. All placeholders available in [`output.filename`](https:
//webpack.js.org/configuration/output/#outputfilename) are also available here.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: '[name].bundle.js',
        },
      },
    },
  },
};
```

And as a function:

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: (pathData) => {

            return `${pathData.chunk.name}-bundle.js`;
          },
        },
      },
    },
  },
};
```

It is possible to create a folder structure by providing path prefixing the filename: `'js/vendor/bundle.js'`.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: 'js/[name]/bundle.js',
        },
      },
    },
  },
};
```

**`splitChunks.cacheGroups.{cacheGroup}.enforce`**

`boolean = false`

Tells webpack to ignore [`splitChunks.minSize`](https:
//webpack.js.org/concepts/#splitchunksminsize), [`splitChunks.minChunks`](https:
//webpack.js.org/concepts/#splitchunksminchunks), [`splitChunks.maxAsyncRequests`](https:
//webpack.js.org/concepts/#splitchunksmaxasyncrequests) and [`splitChunks.maxInitialRequests`](https:
//webpack.js.org/concepts/#splitchunksmaxinitialrequests) options and always create chunks for this cache group.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          enforce: true,
        },
      },
    },
  },
};
```

**`splitChunks.cacheGroups.{cacheGroup}.idHint`**

`string`

Sets the hint for chunk id. It will be added to chunk's filename.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          idHint: 'vendors',
        },
      },
    },
  },
};
```

### Examples

#### Defaults: Example 1

```typescript
import("./a");
```

```typescript
import "react";
```

**Result:** A separate chunk would be created containing `react`. At the import call this chunk is loaded in parallel to the original chunk containing `./a`.

Why:

- Condition 1: The chunk contains modules from `node_modules`
- Condition 2: `react` is bigger than 30kb
- Condition 3: Number of parallel requests at the import call is 2
- Condition 4: Doesn't affect request at initial page load

What's the reasoning behind this? `react` probably won't change as often as your application code. By moving it into a separate chunk this chunk can be cached separately from your app code (assuming you are using chunkhash, records, Cache-Control or other long term cache approach).

#### Defaults: Example 2

```typescript
import("./a");
import("./b");
```

```typescript
import "./helpers";
```

```typescript
import "./helpers";
import "./more-helpers";
```

**Result:** A separate chunk would be created containing `./helpers` and all dependencies of it. At the import calls this chunk is loaded in parallel to the original chunks.

Why:

- Condition 1: The chunk is shared between both import calls
- Condition 2: `helpers` is bigger than 30kb
- Condition 3: Number of parallel requests at the import calls is 2
- Condition 4: Doesn't affect request at initial page load

Putting the content of `helpers` into each chunk will result into its code being downloaded twice. By using a separate chunk this will only happen once. We pay the cost of an additional request, which could be considered a tradeoff. That's why there is a minimum size of 30kb.

#### Split Chunks: Example 1

Create a `commons` chunk, which includes all code shared between entry points.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
};
```

#### Split Chunks: Example 2

Create a `vendors` chunk, which includes all code from `node_modules` in the whole application.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

#### Split Chunks: Example 3

Create a `custom vendor` chunk, which contains certain `node_modules` packages matched by `RegExp`.

**webpack.config.js**

```
module.exports = {

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
```
