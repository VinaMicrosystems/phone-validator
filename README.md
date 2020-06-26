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

 ## SET UP
Both Glide and go mod have been used because Heroku requires go mod. Use either one for dependency management.

## Contribution
PRs are highly welcome!
Check out the official repository:

**https://github.com/nyaruka/phonenumbers**