# Express TypeScript CRUD API

A simple backend server using Express, TypeScript and SQLite (via Prisma ORM) to provide a CRUD API for managing "items".

## Features

- **Create** a resource (item)
- **List** resources with basic (name) filtering
- **Read** details of a resource
- **Update** a resource
- **Delete** a resource
- Typed with TypeScript
- SQLite for easy persistence

## Prerequisites

- Node.js (v16 or higher recommended)
- npm

## Getting Started

### 1. Clone & Install

```sh
cd problem-5
npm install
```

### 2. Setup Database (SQLite)

First, generate the Prisma client and set up your SQLite database:

```sh
npx prisma generate
npx prisma migrate dev --name init
```

This creates the initial database and tables.

### 3. Run the Server

For live-reloading (development):

```sh
npm run dev
```

For compiled production:

```sh
npm run build
npm start
```

By default, the server runs at http://localhost:3000

### 4. API Endpoints

**Base path:** `/items`

#### Create

- `POST /items`
    - Body: `{ "name": "Your item name" }`
```sh
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"First thing"}'
```

#### List (with optional `?name=foo` filter)

- `GET /items`
- `GET /items?name=foo`
- Supports `?skip=0&take=20` pagination

```sh
curl "http://localhost:3000/items" curl "http://localhost:3000/items?name=First%20thing"
```

#### Retrieve

- `GET /items/:id`

```sh
 curl "http://localhost:3000/items/1"
```

#### Update

- `PUT /items/:id`
    - Body: `{ "name": "New name" }`
```sh
 curl -X PUT http://localhost:3000/items/1 -H "Content-Type: application/json" -d '{"name":"Updated name"}'
```

#### Delete

- `DELETE /items/:id`

```shell
 curl -X DELETE http://localhost:3000/items/1
```

### 5. Example Request

```sh
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" \
  -d '{"name":"First thing"}'
```

## Customization

- Edit `prisma/schema.prisma` to add more fields to the Item model.
- Run `npx prisma migrate dev --name describe-change` after modifying the schema.
