

case $1 in
  "all") curl http://localhost:3000/users
    ;;
  "get") curl "http://localhost:3000/users/$2"
    ;;
  "create") curl -X POST localhost:3000/users -d "{\"email\":\"foo$2@example.com\"}" -H "Content-Type: application/json"
    ;;
  "delete") curl -X DELETE localhost:3000/users/$2
    ;;
  "update") curl -X PUT localhost:3000/users/$2 -d "{\"firstName\":\"Free\",\"lastName\":\"Tacos\"}" -H "Content-Type: application/json"
    ;;
esac
