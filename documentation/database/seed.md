NEED TO BE UPDATE DEPENDNG THE NEW PROJECT


## Generate

If you have just pulled the project and you do not have an .env in the root of the project, it is necessary to have one for the operation of the database.

```shell
prisma generate
```

## .env

It is possible that during the development phase of this project, the .env is left in this case there is no point in generating this file, it is already present.

Here is the content of this file:

```.env
DATABASE_URL="mysql://user:password@localhost:PORT/webshop-as"
```
We can distinguish that it contains the dialect, username, password, port and name of the database. It's up to you to modify it according to your interest

## Schema

If this file is correctly registered, and the drivers and other elements necessary for the operation and reading of the base are present. You can therefore generate this database as well as the data set present in the prisma seed.ts directory with the following command.

Command for base tables 👍
```sql
create schema `webshop-as`;
````

```shell
cd apps/api
npx prisma migrate dev --name "restart-from-branch"
npx prisma db seed
```

This will make it possible to generate the base elements from the migration file present in the prisma directory, then generate the entities.

Now launch the app and consult the database to see if the tables and entities are correctly generated. If errors are present, take courage.