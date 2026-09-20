/**
 * Shared domain event names for the event-driven POC.
 * Publishers/consumers wire these up in later labs.
 */
export const EventNames = {
  ORDER_CREATED: 'order.created',
  ORDER_CANCELLED: 'order.cancelled',
  PAYMENT_COMPLETED: 'payment.completed',
  PAYMENT_FAILED: 'payment.failed',
  INVENTORY_RESERVED: 'inventory.reserved',
  INVENTORY_RELEASED: 'inventory.released',
  SHIPMENT_CREATED: 'shipping.created',
  SHIPMENT_DELIVERED: 'shipping.delivered',
  NOTIFICATION_REQUESTED: 'notification.requested',
  WORKFLOW_STARTED: 'workflow.started',
  WORKFLOW_COMPLETED: 'workflow.completed',
  AUDIT_RECORDED: 'audit.recorded',
  ANALYTICS_TRACKED: 'analytics.tracked',
} as const;

export type EventName = (typeof EventNames)[keyof typeof EventNames];

export interface DomainEvent<TPayload = unknown> {
  name: EventName;
  payload: TPayload;
  occurredAt: string;
  correlationId?: string;
}
