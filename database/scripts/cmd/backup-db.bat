FOR /f "usebackq" %%i IN (`PowerShell ^(Get-Date^).AddDays^(-1^).ToString^('yyyy_MM_dd_HH_mm'^)`) DO SET now=%%i
::For /f "tokens=1-2 delims=/:" %%a in ("%TIME%") do (set now=%%a_%%b)
set filename=Csvm_%now%.bak
docker exec csvm-db /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Csvm2023!" -q "BACKUP DATABASE [Csvm] TO DISK = N'/opt/mssql/backups/%filename%' with NOFORMAT, NOINIT, NAME = 'Csvm-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"