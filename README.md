# Async Fetch Client

Simple wrapper around isomorphic-fetch to help make API calls easier.

## Install

```
npm install --save async-fetch-client
```

## Usage

```javascript
import fetchClient from 'async-fetch-client';

const { error, json } = await fetchClient('/api/users', { method: 'GET' });
if (error) {
  // handle error
}

// continue to use `json` however you want.
```
