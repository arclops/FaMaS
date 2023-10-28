CREATE DATABASE FAMAS;
USE FAMAS;

-- Create user table in psql or pgAdmin

create table user (
    uid int not null auto_increment,
    fname varchar(15) not null,
    lname varchar(15) not null,
    email varchar(50) not null,
    password varchar(64) not null,
    hashedpassword varchar(128) not null,
    phone int(15) not null,
    role varchar(10) not null check (role in ('admin', 'farmer', 'customer')),
    regdate datetime not null,
    lastlogin datetime,
    primary key (uid),
    unique (email),
)