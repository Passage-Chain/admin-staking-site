import { Event as CosmosEvent } from '@cosmjs/stargate'

export const findEventAttrs = (
  events: readonly CosmosEvent[],
  eventType: string,
  attrKey: string,
): string[] => {
  const retval = []

  for (const event of events) {
    if (event.type === eventType) {
      for (const attr of event.attributes) {
        if (attr.key === attrKey) {
          retval.push(attr.value)
        }
      }
    }
  }
  return retval
}
