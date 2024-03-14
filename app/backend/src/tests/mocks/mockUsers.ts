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
  password: "secret_admin"
}

export { mockUsersAll, mockOneUser }