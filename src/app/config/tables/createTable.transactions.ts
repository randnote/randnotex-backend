export let createTransactionBlockchain: string = `create table if not exists transactionsBlockhain(
    id int primary key auto_increment,
    user_id int not null,
    publicAddress MEDIUMTEXT not null,
    amount decimal(10,8) not null
)`;

export let createTransactionWebsite: string = `create table if not exists transactionsWebsite(
    id int primary key auto_increment,
    user_id int not null,
    price decimal(10,2) not null,
    type enum ('buy','sell') not null,  
    amount decimal(10,2) not null
`
// price represents the price of the coin at the time...
// type is whether they are buying or selling...
