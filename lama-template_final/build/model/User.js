"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    setRole(role) {
        this.role = role;
    }
    static stringToUserRole(input) {
        switch (input) {
            case "NORMAL":
                return UserRole.NORMAL;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                throw new Error("Invalid user role");
        }
    }
    static toUserModel(user) {
        return new User(user.id, user.name, user.email, user.password, User.stringToUserRole(user.role));
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "NORMAL";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
//# sourceMappingURL=User.js.map