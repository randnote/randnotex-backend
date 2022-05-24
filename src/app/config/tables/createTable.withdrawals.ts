export let createWithdrawalsTable: string = `create table if not exists withdrawals(
    id int primary key auto_increment,
    user_id int not null,
    card_id int not null,
    amount decimal(10,2) not null,
    timestamp DATETIME not null

)`