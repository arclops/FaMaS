-- To be run in query tool of pgAdmin
-- CREATE DATABASE FaMaS;
-- USE FaMaS;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user table in psql or pgAdmin

-- To restart uid from 1, use the following command
-- ALTER SEQUENCE users_uid_seq RESTART WITH 1;

-- Admin Dashboard tables

CREATE TABLE users (
    uid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname VARCHAR(15) NOT NULL,
    lname VARCHAR(15) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone BIGINT UNIQUE,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'farmer', 'customer')),
    regdate TIMESTAMP NOT NULL,
    lastlogin TIMESTAMP,
    CONSTRAINT email_or_phone CHECK (
        (email IS NOT NULL AND phone IS NULL) OR
        (email IS NULL AND phone IS NOT NULL) OR
        (email IS NOT NULL AND phone IS NOT NULL)
    )
);

-- Farmer Dashboard tables

CREATE TABLE farmers (
    fid uuid PRIMARY KEY references users(uid) on update cascade on delete cascade,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    dob DATE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    aadhar VARCHAR(12) UNIQUE NOT NULL,
    pan VARCHAR(10) UNIQUE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive', 'banned'))
);

CREATE TABLE farm (
    fid uuid PRIMARY KEY references farmers(fid) on update cascade on delete cascade,
    farmsize INT NOT NULL,
    farmname VARCHAR(255) NOT NULL,
    address TEXT,
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive')),
    product VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    pid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    pname VARCHAR(255) NOT NULL,
    fid uuid REFERENCES farmers(fid) on update cascade on delete cascade,
    variants INT NOT NULL,
    price numeric(10, 2) NOT NULL,
    stock INT NOT NULL,
    image_url VARCHAR(255),
    sale_status boolean DEFAULT false,
    sale_price numeric(10, 2)
);

-- Server logs

create table serverlogs (
	logid serial primary key,
	logs varchar(250) not null,
	datetime timestamp not null
);

--- Homepage table

create table contactus (
    prospectid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname varchar(30) not null,
    lname varchar(50) not null,
    email varchar(100),
    phone varchar(15),
    message text not null
    CONSTRAINT email_or_phone CHECK (
        (email IS NOT NULL AND phone IS NULL) OR
        (email IS NULL AND phone IS NOT NULL) OR
        (email IS NOT NULL AND phone IS NOT NULL)
    )
)