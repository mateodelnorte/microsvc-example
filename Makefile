DEBUG=info*,debug*,error*,warn*
LOG_LEVEL=0
NODE_ENV=development

start:
	DEBUG=$(DEBUG) \
	NODE_ENV=$(NODE_ENV) \
	node index.js | bunyan -o short -l info

start-debug:
	DEBUG="*" \
	NODE_ENV=$(NODE_ENV) \
	node index.js | bunyan -o short -l $(LOG_LEVEL)