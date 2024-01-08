USE [Csvm]
GO

DBCC CHECKIDENT ('CredentialStatus', RESEED, 0);

INSERT INTO [CredentialStatus]
([Code], [Description])
VALUES
('Unverified', 'Credential unverified'),
('Active', 'Credential active'),
('Inactive', 'Credential inactive'),
('Suspended', 'Credential suspended'),
('Blocked', 'Credential blocked'),
('Deleted', 'Credential deleted');
GO

DBCC CHECKIDENT ('Roles', RESEED, 0);
GO

INSERT INTO [Roles]
([Level], [Code], [Description])
VALUES
(1, 'Guest', 'Guest Role'),
(10, 'Member', 'Guest Role'),
(100, 'Staff', 'Staff Member Role'),
(200, 'Manteiner', 'Manteiner Role'),
(255, 'Admin', 'Administrator Role');
GO

DBCC CHECKIDENT ('Authorizations', RESEED, 0);
GO

INSERT INTO [Authorizations]
([Code], [Description])
VALUES
('User.View','Allow the visualization of the user master data.'),
('User.Add','Allow the possibility to add new users.'),
('User.Update','Allow the possibility to modify existing users.'),
('User.Delete','Allow the possibility to delete existing users.'),
('Role.Manager','Allow permission on roles master data'),
('Auth.Manager','Allow permission on authorizations master data'),
('Schedule.View','Allow the visualization of the workout schedule master data.'),
('Schedule.Add','Allow the possibility to add new workout schedules.'),
('Schedule.Update','Allow the possibility to modify existing workout schedules.'),
('Schedule.Delete','Allow the possibility to delete existing workout schedules.'),
('Exercise.View','Allow the visualization of the exercise master data.'),
('Exercise.Add','Allow the possibility to add new exercises.'),
('Exercise.Update','Allow the possibility to modify existing exercises.'),
('Exercise.Delete','Allow the possibility to delete existing exercises.');
GO

DBCC CHECKIDENT ('UserStatus', RESEED, 0);
GO

INSERT INTO [UserStatus]
([Code], [Description])
VALUES
('Active', 'User active status'),
('Inactive', 'User inactive status'),
('Suspended', 'User suspended status'),
('Blocked', 'User blocked status'),
('Deleted', 'User deleted status');
GO