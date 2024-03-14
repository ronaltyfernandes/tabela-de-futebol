const mockUsersAll = [
  {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com"
  },
  {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com"
  },
  {
    id: 3,
    username: "User",
    role: "user",
    email: "@user.com"
  },
  {
    id: 4,
    username: "User",
    role: "user",
    email: "invalid.user@user.com"
  }
]

const mockOneUser =   {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

export { mockUsersAll, mockOneUser }