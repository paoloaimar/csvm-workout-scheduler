USE [Csvm]
GO

CREATE TABLE [UserStatus] (
  [PkId] int PRIMARY KEY IDENTITY(1, 1),
  [Code] nvarchar(20) UNIQUE NOT NULL,
  [Description] nvarchar(150),
  [CreatedAt] datetime DEFAULT (CURRENT_TIMESTAMP),
  [Updated_at] datetime
)
GO

CREATE TABLE [Users] (
  [PkId] bigint PRIMARY KEY IDENTITY(1, 1),
  [StatusPkId] int,
  [FirstName] nvarchar(100),
  [LastName] nvarchar(100),
  [LoginName] nvarchar(100) NOT NULL,
  [CreatedAt] datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [Roles] (
  [PkId] int PRIMARY KEY IDENTITY(1, 1),
  [Level] int UNIQUE NOT NULL,
  [Code] nvarchar(50) UNIQUE NOT NULL,
  [Description] nvarchar(150),
  [CreatedAt] datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [Authorizations] (
  [PkId] int PRIMARY KEY IDENTITY(1, 1),
  [Code] nvarchar(20) UNIQUE NOT NULL,
  [Description] nvarchar(150),
  [CreatedAt] datetime DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [RoleToAuth] (
  [RolePkId] int,
  [AuthPkId] int,
  PRIMARY KEY ([RolePkId], [AuthPkId])
)
GO

CREATE TABLE [UserToRoles] (
  [UserPkId] bigint,
  [RolesPkId] int,
  PRIMARY KEY ([UserPkId], [RolesPkId])
)
GO

CREATE TABLE [CredentialStatus] (
  [PkId] int PRIMARY KEY IDENTITY(1, 1),
  [Code] nvarchar(20) UNIQUE NOT NULL,
  [Description] nvarchar(150),
  [CreatedAt] datetime DEFAULT (CURRENT_TIMESTAMP),
  [Updated_at] datetime
)
GO

CREATE TABLE [Credentials] (
  [PkId] bigint PRIMARY KEY IDENTITY(1, 1),
  [StatusPkId] int DEFAULT (1),
  [UserPkId] bigint NOT NULL,
  [Username] nvarchar(100) NOT NULL,
  [Email] nvarchar(100) NOT NULL,
  [HashPwd] varchar(200) NOT NULL,
  [VerificationCode] varchar(200),
  [CreatedAt] datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [Exercices] (
  [PkId] bigint PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(100) NOT NULL,
  [Description] nvarchar(250),
  [Note] nvarchar(500),
  [ImageUUID] char(255),
  [CreatedAt] datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [ExercicesAttributes] (
  [PkId] int PRIMARY KEY IDENTITY(1, 1),
  [Attribute] nvarchar(50) NOT NULL,
  [Description] nvarchar(250)
)
GO

CREATE TABLE [WorkoutSchedules] (
  [PkId] bigint PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(100) NOT NULL,
  [Version] nvarchar(50) NOT NULL,
  [Note] nvarchar(500),
  [Owner] nvarchar(250) NOT NULL,
  [CreatedBy] nvarchar(100) NOT NULL,
  [CreatedAt] datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  [UpdatedAt] datetime
)
GO

CREATE TABLE [ScheduleContent] (
  [SchedulePkId] bigint NOT NULL,
  [ExercisePkId] bigint NOT NULL,
  PRIMARY KEY ([SchedulePkId], [ExercisePkId])
)
GO

CREATE TABLE [dbo].[AttributeToExercise] (
  [PkId] bigint PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [ExercisePkId] bigint NOT NULL,
  [AttributePkId] int NOT NULL
)
GO

CREATE INDEX [IDX_StatusCode] ON [UserStatus] ("Code")
GO

CREATE INDEX [IDX_UserFirstName] ON [Users] ("FirstName")
GO

CREATE INDEX [IDX_UserLastName] ON [Users] ("LastName")
GO

CREATE INDEX [IDX_UserLoginName] ON [Users] ("LoginName")
GO

CREATE INDEX [IDX_RoleCode] ON [Roles] ("Code")
GO

CREATE INDEX [IDX_AuthCode] ON [Authorizations] ("Code")
GO

CREATE UNIQUE INDEX [CredentialStatus_index_6] ON [CredentialStatus] ("Code")
GO

CREATE UNIQUE INDEX [Credentials_index_7] ON [Credentials] ("Username")
GO

CREATE UNIQUE INDEX [Credentials_index_8] ON [Credentials] ("Email")
GO

CREATE UNIQUE INDEX [Exercices_index_9] ON [Exercices] ("Name")
GO

CREATE UNIQUE INDEX [ExercicesAttributes_index_10] ON [ExercicesAttributes] ("Attribute")
GO

CREATE UNIQUE INDEX [WorkoutSchedules_index_11] ON [WorkoutSchedules] ("Name", "Version")
GO

CREATE INDEX [IDX_ScheduleOwner] ON [WorkoutSchedules] ("Owner")
GO

CREATE INDEX [IDX_ScheduleCreatedAt] ON [WorkoutSchedules] ("CreatedAt")
GO

CREATE INDEX [IDX_ScheduleUpdatedAt] ON [WorkoutSchedules] ("UpdatedAt")
GO

CREATE UNIQUE INDEX [dbo].[AttributeToExercise_index_0] ON [dbo].[AttributeToExercise] ("ExercisePkId", "AttributePkId")
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the state that a user can assume.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the state',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Status"s code',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus',
@level2type = N'Column', @level2name = 'Code';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'State"s description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of state creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of state update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserStatus',
@level2type = N'Column', @level2name = 'Updated_at';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'This table contains all the application"s users.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s unique id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s current state',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'StatusPkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s first name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'FirstName';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s last name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'LastName';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s login name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'LoginName';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of user creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of user update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Users',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the roles level that a user can assume.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the role',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Role auth level [0-255]',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'Level';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identification code of the role',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'Code';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Role"s description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of role creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of role update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Roles',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the authorizations to a given application feature.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the authorization',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Authorization"s code',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations',
@level2type = N'Column', @level2name = 'Code';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Authorization"s description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of authorization creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of authorization update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Authorizations',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the permissions (authorizations) of a user role.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'RoleToAuth';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Role"s Id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'RoleToAuth',
@level2type = N'Column', @level2name = 'RolePkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Authorization"s Id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'RoleToAuth',
@level2type = N'Column', @level2name = 'AuthPkId';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the roles associated to a user.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserToRoles';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User"s Id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserToRoles',
@level2type = N'Column', @level2name = 'UserPkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Role"s Id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'UserToRoles',
@level2type = N'Column', @level2name = 'RolesPkId';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains the list of possible states a user credential can be in.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of teh status',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Status"s code',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus',
@level2type = N'Column', @level2name = 'Code';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Status"s description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the status creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the status update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'CredentialStatus',
@level2type = N'Column', @level2name = 'Updated_at';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains the set of credentials used by users to connect to the application.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the credential',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Credential"s status',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'StatusPkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Reference user id',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'UserPkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Username used for login in the app',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'Username';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Contact email',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'Email';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Crypted local password used for login',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'HashPwd';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Verification code used during user activation.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'VerificationCode';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the credential creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the credential update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Credentials',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the exercices that can be use to fill out a workout schedule.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the Exercise',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercise"s name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'Name';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercise"s description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercice"s notes, if any',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'Note';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Reference to the image linked to the exercise',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'ImageUUID';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the exercise creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the exercise update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Exercices',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Exercice attributes master data table. This table define all the attribute through which will be possible aggregate or categorize exercices.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ExercicesAttributes';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Primary key of the exercise attribute',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ExercicesAttributes',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercice attribute identification name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ExercicesAttributes',
@level2type = N'Column', @level2name = 'Attribute';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercice attribute description',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ExercicesAttributes',
@level2type = N'Column', @level2name = 'Description';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table contains all the workout schedules .',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the workout schedule',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Workout schedule name',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'Name';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Version of the schedule',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'Version';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Exercice"s notes, if any',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'Note';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Owner (customer name) of the schedule',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'Owner';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'User who create the schedule',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'CreatedBy';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the schedule creation',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'CreatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Date of the last schedule update',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'WorkoutSchedules',
@level2type = N'Column', @level2name = 'UpdatedAt';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'The table define the concrete content (exercices) of a compiled workout schedule.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ScheduleContent';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the workout schedule',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ScheduleContent',
@level2type = N'Column', @level2name = 'SchedulePkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Unique id of the exercise',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ScheduleContent',
@level2type = N'Column', @level2name = 'ExercisePkId';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Table to link n attribute to an exercise.',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'AttributeToExercise';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Primary key of the table',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'AttributeToExercise',
@level2type = N'Column', @level2name = 'PkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Primary key of the exercise',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'AttributeToExercise',
@level2type = N'Column', @level2name = 'ExercisePkId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Primary key of the aggregation attribute',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'AttributeToExercise',
@level2type = N'Column', @level2name = 'AttributePkId';
GO

ALTER TABLE [Users] ADD FOREIGN KEY ([StatusPkId]) REFERENCES [UserStatus] ([PkId])
GO

ALTER TABLE [RoleToAuth] ADD FOREIGN KEY ([RolePkId]) REFERENCES [Roles] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [RoleToAuth] ADD FOREIGN KEY ([AuthPkId]) REFERENCES [Authorizations] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [UserToRoles] ADD FOREIGN KEY ([UserPkId]) REFERENCES [Users] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [UserToRoles] ADD FOREIGN KEY ([RolesPkId]) REFERENCES [Roles] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [Credentials] ADD FOREIGN KEY ([StatusPkId]) REFERENCES [CredentialStatus] ([PkId])
GO

ALTER TABLE [Credentials] ADD FOREIGN KEY ([UserPkId]) REFERENCES [Users] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[AttributeToExercise] ADD FOREIGN KEY ([ExercisePkId]) REFERENCES [Exercices] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[AttributeToExercise] ADD FOREIGN KEY ([AttributePkId]) REFERENCES [ExercicesAttributes] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [ScheduleContent] ADD FOREIGN KEY ([SchedulePkId]) REFERENCES [WorkoutSchedules] ([PkId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO

ALTER TABLE [ScheduleContent] ADD FOREIGN KEY ([ExercisePkId]) REFERENCES [Exercices] ([PkId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
