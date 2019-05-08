
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
  author_id integer references users(id)
);
