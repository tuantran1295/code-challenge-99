

var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

// Iterative Approach
// Time Complexity: O(n) — Loop runs n times.
//     Space Complexity: O(1)

var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function(n) {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
};