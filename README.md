TODO
====

1. plugin system, allowing a number of items to be run before service start (refactor to initialize immediately)
2. Number type that inherits from bignumber.js and overrides it's bson serialization to us toString()
3. plugin that does preprocessing to ensure all usages of Number operators issue a warning to use new Number type
4. plugin for servicebus, registers a .bus property on the global service object
   should use logging system to set correlationId when a message comes in
5. plugin for event sourcing, creates ~/lib/models folder and a ~/lib/mongo.js module, adds sourced and sourced-repo-mongo dependency
6. plugin for active record, creates ~/lib/models folder and a ~/lib/mongo.js module, adds mongoose dependency
-- 7. plugin for llog
8. plugin for bunyan (refactor to not need special logger prop)
9. plugin + middleware for servicebus to use execute all inbound messages in a new domain, to add the message's correlationId to the domain, and to always log the correlationId using a child logger
