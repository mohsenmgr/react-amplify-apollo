/** @format */

// AppSync recommends using UUIDs for Subscription IDs but SubscriptionClient uses an incrementing number
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { v4 as uuid4 } from 'uuid';

// @ts-ignore
export class UUIDOperationIdSubscriptionClient extends SubscriptionClient {
  generateOperationId() {
    return uuid4();
  }
}
