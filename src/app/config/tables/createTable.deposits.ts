export let createDepositsTable: string = `create table if not exists deposits(
    id int primary key auto_increment,
    user_id int not null,
    card_id int not null,
    amount decimal(10,2) not null
)`