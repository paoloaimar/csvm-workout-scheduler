USE [Csvm]
GO

IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'spCreateCredential'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.spCreateCredential
GO

CREATE PROCEDURE dbo.spCreateCredential
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @LoginName NVARCHAR(100),
    @Username NVARCHAR(100),
    @Email NVARCHAR(100),
    @HashPwd NVARCHAR(200),
    @VerificationCode NVARCHAR(200)
AS
BEGIN
    
    SET NOCOUNT ON;
    
    DECLARE @userPkId BIGINT = -1;
    DECLARE @credentialPkId BIGINT = -1;
    DECLARE @UNVERIFIED INT = 1;
    DECLARE @ACTIVE INT = 1;
    DECLARE @result INT = -1;
    DECLARE @exception  NVARCHAR(250) = '';
    
    BEGIN TRAN;

    BEGIN TRY

        SET @userPkId = (SELECT TOP 1 COALESCE(PkId, -1) AS [PkId]
        FROM Users 
        WHERE FirstName = @FirstName AND LastName = @LastName AND LoginName = @LoginName);

        IF(@userPkId = -1)
        BEGIN
            --user does not exist => create it
            INSERT INTO Users
            (
                StatusPkId,
                FirstName,
                LastName,
                LoginName
            )
            VALUES 
            (
                @ACTIVE,
                @FirstName,
                @LastName,
                @LoginName
            );

            --get the just inserted user pkid
            SET @userPkId = (SELECT IDENT_CURRENT('Users'));
        END;

        IF(@userPkId > 0)
        BEGIN
            INSERT INTO Credentials
            (
                StatusPkId,
                UserPkId,
                Username,
                Email,
                HashPwd,
                VerificationCode
            )
            VALUES
            (
                @UNVERIFIED,
                @userPkId,
                @Username,
                @Email,
                @HashPwd,
                @VerificationCode
            );

            --get the just inserted credential pkid
            SET @credentialPkId = (SELECT IDENT_CURRENT('Credentials'));
        END;

        COMMIT TRAN;

        SET @result = 1;
        SET @exception = '';
    END TRY
    BEGIN CATCH
        SET @result = -1;
        SET @exception = ERROR_MESSAGE();
        SET @userPkId = -1;
    END CATCH
    
    SELECT @result AS [Result], @exception AS [Exception], @userPkId AS [UserPkId_Inserted], @credentialPkId AS [CredentialPkId_Inserted];
END
GO