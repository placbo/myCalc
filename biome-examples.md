# Biome Recommended Linter Rules - Key Examples

## 1. **noUnusedVariables**
Catches variables that are declared but never used.

```javascript
// ❌ Bad
const userName = "John";
const age = 25;  // unused
console.log(userName);

// ✅ Good
const userName = "John";
console.log(userName);
```

## 2. **noConsoleLog**
Warns about console.log statements (often left by mistake in production).

```javascript
// ❌ Bad
console.log("Debug info");

// ✅ Good
// Remove or use proper logging
```

## 3. **useConst**
Enforces using `const` instead of `let` when variables aren't reassigned.

```javascript
// ❌ Bad
let name = "Alice";
console.log(name);

// ✅ Good
const name = "Alice";
console.log(name);
```

## 4. **noVar**
Disallows `var`, enforces `let` or `const`.

```javascript
// ❌ Bad
var count = 10;

// ✅ Good
let count = 10;
```

## 5. **noDoubleEquals**
Requires strict equality (`===`) instead of loose equality (`==`).

```javascript
// ❌ Bad
if (value == 5) { }

// ✅ Good
if (value === 5) { }
```

## 6. **noUnreachable**
Catches code that can never be executed.

```javascript
// ❌ Bad
function test() {
  return true;
  console.log("unreachable");  // never runs
}

// ✅ Good
function test() {
  console.log("reachable");
  return true;
}
```

## 7. **useValidForDirection**
Prevents infinite loops from wrong for-loop direction.

```javascript
// ❌ Bad
for (let i = 0; i < 10; i--) { }  // infinite!

// ✅ Good
for (let i = 0; i < 10; i++) { }
```

## 8. **noEmptyBlockStatements**
Warns about empty blocks.

```javascript
// ❌ Bad
if (condition) { }

// ✅ Good
if (condition) {
  doSomething();
}
```

These rules help catch common bugs, enforce modern JavaScript best practices, and keep code clean and consistent.
