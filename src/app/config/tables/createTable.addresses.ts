export let createAddresses: string = `create table if not exists addresses(
    id int primary key auto_increment,
    user_id int not null,
    publicAddress MEDIUMTEXT not null,
    privateAddress MEDIUMTEXT not null
)`;
