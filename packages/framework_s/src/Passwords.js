import bcrypt from 'bcryptjs'

export const Passwords = {
  getHash (text, saltNumber) {
    // hash the password
    var pwsalt = bcrypt.genSaltSync(saltNumber)
    return bcrypt.hashSync(text, pwsalt)
  },

  confirmHash (text, hash) {
    return bcrypt.compareSync(text, hash)
  }
}

export default Passwords
