// Iterative Approach
// Time Complexity: O(n) — Loop runs n times.
//     Space Complexity: O(1)

function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Mathematical Formula
// Time Complexity: O(1) — Uses a constant-time arithmetic formula.
//     Space Complexity: O(1)

function sum_to_n_b(n: number): number {
    return n * (n + 1) / 2;
}

// Recursive Approach
// Time Complexity: O(n) — n recursive calls.
//     Space Complexity: O(n) — due to function call stack.

function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}