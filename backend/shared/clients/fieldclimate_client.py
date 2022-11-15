import json

import requests
from requests.auth import AuthBase
from Crypto.Hash import HMAC
from Crypto.Hash import SHA256
from datetime import datetime
from dateutil.tz import tzlocal


# Class to perform HMAC encoding
class AuthHmacMetosGet(AuthBase):
    # Creates HMAC authorization header for Metos REST service GET request.
    def __init__(self, apiRoute, publicKey, privateKey):
        self._publicKey = publicKey
        self._privateKey = privateKey
        self._method = 'GET'
        self._apiRoute = apiRoute

    def __call__(self, request):
        dateStamp = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
        print("timestamp: ", dateStamp)
        request.headers['Date'] = dateStamp
        msg = (self._method + self._apiRoute + dateStamp + self._publicKey).encode(encoding='utf-8')
        h = HMAC.new(self._privateKey.encode(encoding='utf-8'), msg, SHA256)
        signature = h.hexdigest()
        request.headers['Authorization'] = 'hmac ' + self._publicKey + ':' + signature
        return request


# Endpoint of the API, version for example: v1
apiURI = "https://api.fieldclimate.com/v2"

# HMAC Authentication credentials
publicKey = "92f910fe220f8595dc4ee84deae1ab3925b7422e2396e78f"
privateKey = "cf6820ad409b72c796ce088634bd6ac06ba633966a9b3356"

# Service/Route that you wish to call
apiRoute = '/user'

auth = AuthHmacMetosGet(apiRoute, publicKey, privateKey)
response = requests.get(apiURI+apiRoute, headers={'Accept': 'application/json'}, auth=auth)
print(response.json())

apiRoute = "user/stations"
auth = AuthHmacMetosGet(apiRoute, publicKey, privateKey)
response = requests.get(apiURI+apiRoute, headers={'Accept': 'application/json'}, auth=auth)
print(response.json())
with open('00001F76.json', 'w') as f:
    json.dump(response.json(), f, sort_keys=True, indent=2)


apiRoute = "/station/00001F77"
auth = AuthHmacMetosGet(apiRoute, publicKey, privateKey)
response = requests.get(apiURI+apiRoute, headers={'Accept': 'application/json'}, auth=auth)
print(response.json())
with open('00001F77.json', 'w') as f:
    json.dump(response.json(), f, sort_keys=True, indent=2)
