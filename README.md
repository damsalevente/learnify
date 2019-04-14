# Refactor app_api -> done 
Created res.tpl object, data fetch is now in one middleware
The old middlewares will operate on res.tpl instead of their own (and same...) data fetching
One middleware to send the json response to the client side

- smaller middlewares:
    - __object___list -> get data from mongodb and put it on res.tpl.__object__
    - __object___detail -> get one object by id and put it on res.tpl.__object__
    - create, update -> followed by __object___detail, create or update 
    - delete -> get and delete
    - util.send_json -> send the res.tpl as a json response to the client side (app_server currently)

# Refactor app_server -> in progress
 1. Replace every current middleware with just a requestOption preparation on res.tpl (e.g. res.tpl.apiOptions = {url: '', method: 'GET'})

2. Create new util middlewares: 
- apicall ->  fetch the result to res.tpl.data for the rendering
- render(viewName)
- redirectTo(url)
- auth, etc
