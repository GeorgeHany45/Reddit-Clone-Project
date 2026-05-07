# Auth Flow Testing Guide

## Steps to Debug:

### 1. Clear Old Data (Important!)
The user you created might not have a properly hashed password. **Delete the old user from MongoDB first:**

```javascript
// In MongoDB compass or mongosh:
db.users.deleteMany({}) // Clear all users to start fresh
```

### 2. Test Frontend Console
Open browser DevTools (F12) and check **Console tab** when you:

**STEP A: Sign Up**
- Go to signup page
- Enter: `testuser5`, `test5@email.com`, `password123`
- Check console for logs:
  - Should see: `Signup response: {...}`
  - Should see: `Stored in localStorage: {...}`
- Check localStorage (DevTools → Application → Local Storage):
  - Should have `token` and `user` stored
- Username should appear as **u/testuser5** on top right

**STEP B: Log Out**
- Click your avatar (top right)
- Click "Log Out"
- Should redirect to login page

**STEP C: Log In**
- Enter: `testuser5` and `password123`
- Check console for logs:
  - Should see: `Login response: {...}`
  - Should see: `Stored in localStorage: {...}`
  - Should see: `Login successful for: testuser5`
- Username should appear as **u/testuser5** on top right

### 3. Check Backend Terminal
The backend should show detailed logs:

**For Signup:**
```
Register attempt - Username: testuser5 | Email: test5@email.com
Hashing password...
Password hashed. Hash starts with: $2b$10...
User saved to database: testuser5
Token generated. Sending response with user data...
```

**For Login:**
```
Login attempt - Identifier: testuser5
User found: testuser5 | Email: test5@email.com
Stored password hash starts with: $2b$10...
Comparing password...
Password match result: true
Login successful for: testuser5
```

### 4. If Password Match Returns False
This means the password hashing is inconsistent. Delete the user and try again with a fresh signup.

## Expected Results:
✅ Username displays on navbar after signup  
✅ Can logout and login with same credentials  
✅ Username persists after login  
✅ All console logs show successful operations  
