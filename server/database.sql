-- To be run in query tool of pgAdmin
CREATE DATABASE FaMaS;
USE FaMaS;
ALTER DATABASE postgres SET timezone TO 'Asia/Kolkata';

-- Create user table in psql or pgAdmin

-- To restart uid from 1, use the following command
-- ALTER SEQUENCE users_uid_seq RESTART WITH 1;

-- Farmer Dashboard tables

CREATE TABLE farmers (
    fid SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    dob DATE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    aadhar VARCHAR(12) UNIQUE NOT NULL,
    pan VARCHAR(10) UNIQUE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive', 'banned')),
);

-- Admin Dashboard tables

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
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

create table serverlogs (
	logid serial primary key,
	logs varchar(250) not null,
	datetime timestamp not null
);

