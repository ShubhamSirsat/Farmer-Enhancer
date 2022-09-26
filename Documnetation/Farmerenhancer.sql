use farmerenhancer;
create table user(
                    id bigint primary key auto_increment, 
                    address varchar(255), 
                    created_on varchar(255), 
					city varchar(255), 
                    address varchar(255), 
					first_name varchar(255), 
                    last_name varchar(255), 
                    mobile_number varchar(255),
                    password varchar(255),
                    role int,
                    status bit(1),
                    user_name varchar(255),
                    zip bigint);
 
 insert into user values(1,"Shubham","8805596655","Udgir","Walewadi",431517,"Shubham@1",1,"Admin");
 insert into user values(2,"Yogesh","7218668358","Kolhapur","Sajani",416115,"yoga@123",1,"Farmer");
 
 select * from user; 
 
 create table product(id int primary key auto_increment,
                     product_name varchar(255), 
                     product_type int,
                     quantity bigint, 
                     unit bigint, 
                     price bigint,
                     image_url varchar(255), 
                     mfg_date datetime,
                     exp_date datetime,
                     user_id bigint, 
			   foreign key (user_id) references user(user_id));
 
 insert into product values(default,"Strawberry",2,"ton",10000,"~dhsgs","2022/02/22","2022/02/28",1);
 insert into product values(default,"JackFruit",2,"ton",30000,"~rhsgs","2022/02/2","2022/02/23",1);
 insert into product values(default,"Grapes",2,"ton",40000,"~rhsgs","2022/02/2","2022/02/23",2);
select * from product; 
create table feedback(id int primary key auto_increment, 
                      created_on datetime,
                      user_id bigint,
                      product_id bigint,
                      mobile_number varchar(255),
                      rating bigint, 
                      review varchar(255),
                      foreign key (user_id) references user(user_id));   

insert into feedback values(default,1,"7218668358",5,"Nice very Healthy and fresh Fruits You supplied","2022/02/28");
                 
select * from feedback;    

create table product_order(id int primary key auto_increment,
					user_id bigint,
                    product_id bigint,
                    quantity bigint,
                    unit bigint,
                    price bigint,
                    total_price bigint default (quantity * price),
                    payment_status bit(1), 
                    delivery_status bit(1),
                    have_vehicle bit(1),
                    order_date datetime,
			  foreign key (user_id) references user(user_id));        
                    
select * from Product orders;     

create table vehicle(id int primary key auto_increment,
                     vehicle_name varchar(255),
                     product_order_id bigint,
                     quantity bigint,
                     price bigint,
                     no_of_days bigint,
                     total_price bigint default (quantity * price * no_of_days),
                     is_required bit(1),
                     boarding_point varchar(255),
                     dropping_point varchar(255),
                     foreign key (order_id) references orders(order_id));   
                     
select * from vehicle;  
create table Exporter(id bigint,
					   insertion_date datetime(6),
                       product_name varchar(255),
                       product_type varchar(255),
                       quantity bigint,
                       is_pending bit(1),
                       userid bigint);
                       
select * from Exporter;

drop database farmerenhancer;              


 
 

                 
                    



