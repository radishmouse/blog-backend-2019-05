
create table users (
  id serial primary key,
  username text,
  hash text,
  firstname text,
  lastname text
);

create table posts (
  id serial primary key,
  title text,
  content text,
  authorid integer references users(id)
);
