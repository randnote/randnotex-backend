export let createAddresses: string = `create table if not exists addresses(
    id int primary key auto_increment,
    user_id int not null,
    publicAddress varchar(255) not null,
    privateAddress varchar(255)not null
)`;
