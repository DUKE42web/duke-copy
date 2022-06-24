# 📈 Analytics

## Analytics

Adding analytics to a component is pretty straightforward,

First set up your analytics object in your `composition` method:

```typescript

const { compositionFunction, component } = Composition(NavCard)(({ fields, params }) => {

const items = fields?.items.reduce(
    (acc: Parameters<typeof NavCard>[0]['items'], curr: typeof fields) => {
      return [
        {
          ...
          analytics: {
            category: 'nav-card_rectangular',
            label: title?.value || '',
            action: [cta?.text?.value, cta?.href].filter(Boolean).join(' | '),
            guid: link?.value?.id || '',
            event: 'event-click',
          },
        },
      ];
    },
    []
  );
```

Then import the `track` object from `src/lib/Analytics` into your component, and grab the `analytics` data from the composition props. After that, simply attach a handler to the correct component node, to call the `track.component` method and send the data to analytics:

```typescript
import track from 'src/lib/Analytics';
...

const ComponentName = ({
  ...
  analytics,
}: PropsType) => {

...
  <Button
    ...
    onClick={() => track.component(analytics)}
  >
    Click Me!
  </Button>
```

### Testing Analytics

When not in production, analytics data will be sent to the console instead of to Google. To verify that your analytics are being setup and used correctly, simply open the console, trigger the analytics method, and you should see something similar to the following:

Intro | Technical Overview | Practical Overview | Typescript | Sitecore | Definition of Done | Analytics
