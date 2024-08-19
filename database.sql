CREATE TABLE
`usuario` (
`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT,
`nome` varchar(40) NOT NULL,
`email` varchar(40) NOT NULL,
`senha` varchar(20) NOT NULL,
`createdAt` datetime,
`updatedAt` datetime
)
