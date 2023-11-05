FROM mcr.microsoft.com/mssql/server:2022-latest

ARG DEFAULT_PWD=Csvm2023!

ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD $DEFAULT_PWD

# change active user to root
USER root 

#create scripts directory
RUN mkdir -p /opt/mssql/scripts
#create backups directory
RUN mkdir -p /opt/mssql/backups

# set mssql as owner of the directories
RUN chown mssql /opt/mssql/scripts
RUN chown mssql /opt/mssql/backups

# change back to user mssql
USER mssql

#copy the scripts to initialize db
COPY /scripts/sql/ /opt/mssql/scripts

#run db initialization scripts
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -i /opt/mssql/scripts/01_CREATE_USERS.sql \
    && pkill sqlservr 
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -i /opt/mssql/scripts/02_CREATE_DB.sql \
    && pkill sqlservr 
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -i /opt/mssql/scripts/03_CREATE_TABLES.sql \
    && pkill sqlservr 
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -i /opt/mssql/scripts/04_CREATE_DEFAULT_DATA.sql \
    && pkill sqlservr 

