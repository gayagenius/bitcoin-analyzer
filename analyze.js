const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

function loadTransactions(filePath) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading file:", err.message);
    return [];
  }
}

function calculateRevenue(transactions) {
  return transactions.reduce((total, tx) => total + tx.amount * tx.price, 0);
}

function getMostSoldProduct(transactions) {
  const counts = {};

  for (const tx of transactions) {
    counts[tx.product] = (counts[tx.product] || 0) + tx.quantity;
  }

  let max = 0;
  let best = '';

  for (const [product, qty] of Object.entries(counts)) {
    if (qty > max) {
      max = qty;
      best = product;
    }
  }

  return best;
}

function summarizeByCategory(transactions) {
  const summary = {};

  for (const tx of transactions) {
    if (!summary[tx.category]) {
      summary[tx.category] = { revenue: 0, quantity: 0 };
    }
    summary[tx.category].revenue += tx.amount * tx.price;
    summary[tx.category].quantity += tx.quantity;
  }

  return summary;
}

function exportFilteredCSV(transactions, category, outputPath) {
  const filtered = transactions.filter(tx => tx.category === category);
  if (filtered.length === 0) {
    console.log("No transactions found for category:", category);
    return;
  }

  const csv = parse(filtered);

  fs.writeFileSync(outputPath, csv);
  console.log(`CSV exported to ${outputPath}`);
}

function main() {
  const transactions = loadTransactions('transactions.json');
  if (transactions.length === 0) return;

  const totalRevenue = calculateRevenue(transactions);
  const topProduct = getMostSoldProduct(transactions);
  const categorySummary = summarizeByCategory(transactions);

  console.log("\n📊 Total Revenue:", totalRevenue.toFixed(2));
  console.log("🏆 Most Sold Product:", topProduct);
  console.log("📂 Category Summary:\n", categorySummary);

  exportFilteredCSV(transactions, 'Merch', 'merch-transactions.csv');
}

main();
