docker exec csvm-db /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Csvm2023!" -i "/opt/mssql/scripts/01_CREATE_USERS.sql"

docker exec csvm-db /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Csvm2023!" -i "/opt/mssql/scripts/02_CREATE_DB.sql"

docker exec csvm-db /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Csvm2023!" -i "/opt/mssql/scripts/03_CREATE_TABLES.sql"