

case $1 in
  "all") curl http://localhost:3000/users
    ;;
  "get") curl http://localhost:3000/users/$2
    ;;
  "getList") curl http://localhost:3000/users?list=00001%2C00002%2C00003
    ;;
  "create") curl -X POST localhost:3000/users \
            -d "[{\"email\":\"foo@example.com\"}]" \
            -H "Content-Type: application/json"
    ;;
  "createList") curl -X POST localhost:3000/users \
                -d "[{\"email\":\"foo@example.com\"},{\"email\":\"bar@example.com\"},{\"email\":\"baz@example.com\"}]" \
                -H "Content-Type: application/json"
    ;;
  "delete") curl -X DELETE localhost:3000/users/$2
    ;;
  "deleteList") curl -X DELETE localhost:3000/users  \
            -d "[\"00001\", \"00002\"]" \
            -H "Content-Type: application/json"
    ;;
  "update") curl -X PUT localhost:3000/users/$2 \
            -d "{\"firstName\":\"Free\",\"lastName\":\"biz\"}" \
            -H "Content-Type: application/json"
    ;;
  "updateList") curl -X PUT localhost:3000/users \
                -d "[{\"id\":\"00001\",\"lastName\":\"biz\"},{\"id\":\"00002\",\"lastName\":\"biz\"}]" \
                -H "Content-Type: application/json"
    ;;
esac
