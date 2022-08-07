CREATE DATABASE shortly;

CREATE TABLE users(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "email" text UNIQUE NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE urls(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "shortedUrl" text NOT NULL,
    "url" text NOT NULL,
    "visitCount" int NOT NULL DEFAULT 0,
    "createdAt" timestamp NOT NULL DEFAULT NOW()  
);

CREATE TABLE tokens(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" int UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "token" text NOT NULL,
    "LastLoginAt" timestamp NOT NULL DEFAULT NOW()
);