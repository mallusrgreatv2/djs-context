# DJS Context

This package helps you create a combination of a chat input command interaction and a message. You can use properties available to both of them.

```ts
const { Context } = require("@mallusrgreat/djs-context");
// or
import { Context } from "@mallusrgreat/djs-context";

client.on("messageCreate", (msg) => {
  const context = new Context(msg);
  handlePingCommand(context);
});
```
