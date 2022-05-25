// admins table:
export let createCards: string = `create table if not exists cards(
    id int primary key auto_increment,
    user_id int not null,
    cardnumber varchar(200) not null,
    carddetails varchar(200) not null,
    month int not null,
    year int not null,
    cvc int not null
)`;
