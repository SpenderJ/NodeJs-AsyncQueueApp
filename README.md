## Client
 
 In order to launch client, after having installed dependencies:
 ```
 npm start
 ```
 
## Server
 
 In order to launch the server, after having installed dependencies:
 
 ```
 npm run build
 npm start
 ```

## Explanations

This is the project from Jules Spender following this [subject](https://asyncdotcom.notion.site/FullStack-Take-home-AsyncQ-3a151ba2bd8d47219e71c5ad9079f78e)

Most efforts have been done in the backend implementation respecting the guidelines, using Node.js , ES6/ES7 and TypeScript.
Api documentation is available and there are tests for the queue methods. You can use the frontend which is a react app in order
to test the backend implementation.

In the `server/src/index.ts` you can find line 17:
```
export const messageQueue = new ConfirmationQueue(10000)
```
This is where we are defining the number of ms that is the configurable amount of time for a requested message to be acknowledged.

For the queue we are using an implementation of a first-in-first-out queue.
We are storing items containing 3 properties (`public_id`, `content` and `creation timestamp`).

- You can add items to the queue using the `enqueue()` method.
- You can remove item in the queue with the `dequeue()` method. This item will have a specified timeout period to be acknowledged, or it will be back in the list.
- You can use the `acknowledge()` method to acknowledge that an item has well been received, and it will confirm its removal from the queue.

As the subject mentioned it is a simple-in-memory queue and is not intended in high-performance or distributed systems.

