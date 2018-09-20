# Async fetch client

A thin wrapper around isomorphic-fetch to help make API calls easier. This is a function I end up reusing in different projects, mostly tailored to my own use.

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
