// admins table:
export let createUsers: string = `create table if not exists users(
    id int primary key auto_increment,
    firstname varchar(200) not null,
    lastname varchar(200)not null,
    email varchar(200)not null,
    password varchar(255) not null,
    verifiedemail varchar(255) not null,
    balance decimal(10,2) DEFAULT '0.00' not null
)`;
