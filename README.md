# Venmore

## Overview

We all use Venmo to send money to our friends, family, and various others, regardless of what the reason may be (i.e. a friend paid for both our meals so we Venmo them back for our meal cost). Although Venmo's payment system works great, I have decided to focus on a multi-user setting, where one person venmo requests multiple users involved in a group dinner setting. This came from my friends and my frustration in sending repetitive Venmo requests, so I thought it would be fun to recreate and upgrade Venmo and call it Venmore.

## Data Model

The application will store users and payment logs.

* Users can have multiple payments.
* Payment logs can have comments and receiving users

(For security purposes, I will use dummy payment logs)

An Example User:

```javascript
{
    name: 'Samuel Kang',
    username: 'Samuel-Kang-1',
    hash: /* hashed password */,
    payments: /* an array of payments */,
    requests: // an array of requests
}
```
An Example Payment/Request:

```javascript 
{
    user: /* reference to user */,
    paymenttype: 'Transfer',
    comment: 'Pizza 🍕',
    id: /* auto id generator */ ,
    amount: $10,
    createdAt: /* timestamp */,
    receiver: /* reference to another user*/,
    status: 'complete' // status will be accepted or pending if paymenttype is 'Request'
}
```



## [Link to Commented First Draft Schema] ()

## Wireframes

## Site map

## User Stories or Use Cases

## Research Topics

## [Link to Initial Main Project File] ()

## Annotations / References Used