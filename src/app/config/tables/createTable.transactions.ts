export let createTransactionBlockchain: string = `create table if not exists transactionsBlockchain(
    id int primary key auto_increment,
    user_id int not null,
    fromAddress MEDIUMTEXT not null,
    toAddress MEDIUMTEXT not null,
    notes decimal(10,8) not null
)`;

export let createTransactionWebsite: string = `create table if not exists transactionsWebsite(
    id int primary key auto_increment,
    user_id int not null,
    price decimal(10,2) not null,
    ordertype enum ('buy','sell') not null,  
    amount decimal(10,2) not null,
    notes decimal(10,8) not null
)`

