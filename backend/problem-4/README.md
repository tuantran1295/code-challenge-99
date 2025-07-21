# Summation to N in TypeScript

This repository provides three unique TypeScript implementations of the function sum_to_n, which computes the sum of all integers from 1 up to a given positive integer n (i.e., 1 + 2 + ... + n).

## Function Signature

```typescript
function sum_to_n(n: number): number
```

## Implementations

### 1. Iterative Approach

Efficient and straightforward, this implementation uses a for-loop to accumulate the sum.

```typescript
function sum_to_n_a(n: number): number {
    let sum = 0;
    for(let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```
- **Time complexity:** O(n)
- **Space complexity:** O(1)
- **Notes:** Suitable for most values of n; simple and readable.

---

### 2. Mathematical Formula

Leverages the arithmetic series formula for the sum of the first n natural numbers.

```typescript
function sum_to_n_b(n: number): number {
    return n * (n + 1) / 2;
}
```
- **Time complexity:** O(1)
- **Space complexity:** O(1)
- **Notes:** Fastest and most resource-efficient. Preferred for performance-critical or very large n.

---

### 3. Recursive Approach

Calculates the sum recursively (i.e., sum_to_n(n) = n + sum_to_n(n-1)).

```typescript
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}
```
- **Time complexity:** O(n)
- **Space complexity:** O(n) (call stack)
- **Notes:** Elegantly expresses the mathematical recurrence, but may cause stack overflows for large n.

---

## Usage

Import or copy the desired function into your TypeScript project. Here is a simple example:

```typescript
console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15
```

## Recommendation

- Use the **mathematical formula (sum_to_n_b)** for optimal performance and code brevity, especially for large inputs.
- Use the **iterative method (sum_to_n_a)** if you want explicit control over the flow and avoid potential issues with recursion limits.
- Use the **recursive approach (sum_to_n_c)** for educational or demonstration purposes.

---

## License

MIT

---