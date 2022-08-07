CREATE DATABASE shortly;

CREATE TABLE users(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "email" text UNIQUE NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp DEFAULT NOW()
);

CREATE TABLE urls(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" int REFERENCES users(id) ON DELETE CASCADE,
    "shortedUrl" text NOT NULL,
    "url" text NOT NULL,
    "visitCount" int NOT NULL DEFAULT 0,
    "createdAt" timestamp DEFAULT NOW()  
);