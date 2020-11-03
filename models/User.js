const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const passwordValidator = require('password-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// Create a schema
const schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// Validate against a password string
console.log(schema.validate('validPASS123'));
// => true
console.log(schema.validate('invalidPASS'));
// => false
 
// Get a full list of rules which failed
console.log(schema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]

module.exports = mongoose.model('User', userSchema);