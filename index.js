// index.js

const readline = require('readline');
const utils = require('random-generations');
const fs = require('fs');
const path = require('path');

// Generate 10 mock transactions
const transactions = utils.getTransactions(10);
console.log("🧾 Sample Transactions:\n", transactions);

// === 1. Calculate Total Revenue ===
const calculateTotalRevenue = () => {
  return transactions.reduce((sum, t) => sum + t.totalPrice, 0);
};

// === 2. Find Most Sold Product ===
const getMostSoldProduct = () => {
  const productCount = {};
  transactions.forEach(t => {
    productCount[t.product] = (productCount[t.product] || 0) + t.quantity;
  });
  return Object.entries(productCount).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
};

// === 3. Count Transactions per Category ===
const getTransactionCountsByCategory = () => {
  const categoryCount = {};
  transactions.forEach(t => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });
  return categoryCount;
};

// === 4. Export Filtered Transactions to CSV ===
const exportTransactionsToCSV = (filteredTransactions, filename) => {
  const headers = ['product', 'category', 'quantity', 'totalPrice'];
  const rows = filteredTransactions.map(t =>
    `${t.product},${t.category},${t.quantity},${t.totalPrice}`
  );

  const csvContent = [headers.join(','), ...rows].join('\n');

  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  const filepath = path.join(reportsDir, filename);
  fs.writeFileSync(filepath, csvContent);
  console.log(`✅ CSV report saved to: ${filepath}`);
};

// === 5. Filter by Category and Export ===
const exportCategoryReport = (categoryName) => {
  const filtered = transactions.filter(t => t.category === categoryName);
  if (filtered.length === 0) {
    console.log(`❌ No transactions found for category: ${categoryName}`);
  } else {
    exportTransactionsToCSV(filtered, `transactions_${categoryName}.csv`);
  }
};

// === 6. Display Summary ===
const displaySummary = () => {
  console.log("\n📊 ANALYTICS SUMMARY");
  console.log("Total Revenue:", calculateTotalRevenue());
  console.log("Most Sold Product:", getMostSoldProduct());

  console.log("\nTransaction Counts by Category:");
  const categoryCounts = getTransactionCountsByCategory();
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(` - ${category}: ${count}`);
  });
};

// === 7. Main Flow ===
displaySummary();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\n🔍 Enter a category to export to CSV (or press Enter to skip): ', (category) => {
  if (category.trim()) {
    exportCategoryReport(category.trim());
  } else {
    console.log("⏩ Skipped CSV export.");
  }
  rl.close();
});
