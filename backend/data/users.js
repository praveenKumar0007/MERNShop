import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Mernshop Admin',
    email: 'admin@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Loganand',
    email: 'loganand@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Praveen',
    email: 'praveen@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
