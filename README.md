## USAGE
use like:
https://phone-validator.herokuapp.com/api?phone=0791294251&country=KE

Gives response:

``
{
  "national_number": 791294251,
  "country_code": 254,
  "is_possible": true,
  "is_valid": true,
  "international_formatted": "+254 791 294251",
  "national_formatted": "0791 294251",
  "version": "debug"
}
``
___
or view live action at :) **https://babu-ke.web.app/** 

 ## SET UP
Both Glide and go mod have been used because Heroku requires go mod and Glide is preffered :). Use either one for dependency management.
To set up
1. git clone this repo
2. run ``go get && go build`` f
3. Invoke the executable binary

## Tip
Use go-watcher **https://github.com/canthefason/go-watcher** to watch .go files as you edit them.

## Contribution
PRs are highly welcome!
Check out the official repository:

**https://github.com/nyaruka/phonenumbers**