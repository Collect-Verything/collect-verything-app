To start app:
Setup Database authentification in appsettings.json 
dotnet run 

Add Migration:
dotnet ef migrations add [MigartionName] 

This command create a migartion file in folder Migrations, to apply it, rune this command:
dotnet ef database update               

Api end point and data model can be check on:
http://localhost:5226/swagger/index.html

