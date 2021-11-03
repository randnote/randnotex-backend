// admins table:
export let createUsers: string = `create table if not exists users(
    id int primary key auto_increment,
    firstname int not null,
    lastname varchar(200)not null,
    email varchar(200)not null,
    verifiedemail varchar(255) not null
)`;
