USE [Csvm]
GO

DBCC CHECKIDENT ('CredentialStatus', RESEED, 1);

INSERT INTO [CredentialStatus]
([Code], [Description])
VALUES
('Active', 'Credential active'),
('Inactive', 'Credential inactive'),
('Suspended', 'Credential suspended'),
('Blocked', 'Credential blocked'),
('Deleted', 'Credential deleted');