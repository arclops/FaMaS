CREATE DATABASE FAMAS;
USE FAMAS;

-- Create user table in psql or pgAdmin

create table user (
    uid int not null auto_increment,
    fname varchar(15) not null,
    lname varchar(15) not null,
    email varchar(50),
    password varchar(64) not null,
    hashedpassword varchar(128) not null,
    phone int(15),
    role varchar(10) not null check (role in ('admin', 'farmer', 'customer')),
    regdate datetime not null,
    lastlogin datetime,
    primary key (uid),
    unique (email),
    unique (phone),
    CONSTRAINT email_or_phone CHECK ((email IS NOT NULL AND phone IS NULL) OR (email IS NULL AND phone IS NOT NULL)) OR (email is NOT NULL AND phone IS NOT NULL)
)