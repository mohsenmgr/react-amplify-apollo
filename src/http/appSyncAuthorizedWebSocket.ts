/** @format */

import { asBase64EncodedJson } from './encodingUtils';

export const createAppSyncAuthorizedWebSocket = (getAppSyncAuthorizationInfo: {
  (): any;
  (): any;
}) => {
  return class extends WebSocket {
    // SubscriptionClient takes a fixed websocket url so we append query string parameters every time the websocket
    // is created, in case the authorization information has changed.
    constructor(url: any, protocols = undefined) {
      super(
        `${url}?header=${asBase64EncodedJson(
          getAppSyncAuthorizationInfo(),
        )}&payload=${asBase64EncodedJson({})}`,
        protocols,
      );
    }

    // AppSync acknowledges GraphQL subscriptions with 'start_ack' messages but SubscriptionClient cannot handle them
    set onmessage(handler: (this: WebSocket, event: MessageEvent<any>) => any) {
      // @ts-ignore
      super.onmessage = event => {
        if (event.data) {
          const data = this._tryParseJsonString(event.data);

          if (data && data.type === 'start_ack') {
            return;
          }
        }

        // @ts-ignore
        return handler(event);
      };
    }

    _tryParseJsonString(jsonString: string) {
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        return undefined;
      }
    }
  };
};
