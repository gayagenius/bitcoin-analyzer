

# 💸 Bitcoin Transaction Network Analysis (Node.js)

A simple yet powerful Node.js project that analyzes Bitcoin transaction data. It processes randomly generated transaction records and provides useful business insights such as revenue, top-selling products, and category-wise transaction analysis. You can also export filtered transactions to CSV reports.

---

## 🚀 Features

- **Total Revenue Calculation** – Computes total revenue from all transactions.
- **Most Sold Product Detection** – Identifies the product with the highest number of units sold.
- **Category Summary** – Counts transactions per product category.
- **CSV Report Export** – Filters transactions by category and exports them to a `.csv` file.
- **Random Transaction Generation** – Uses the `random-generations` package to simulate sample data.

---

## 📁 Folder Structure

```

bitcoin-transaction-analyzer/
├── index.js               # Main application script
├── package.json           # Project metadata & dependencies
├── reports/               # Generated CSV reports
├── README.md              # This documentation file
└── .gitignore             # Files/folders to exclude from Git

````

---

## 🛠️ Installation

Make sure you have **Node.js** installed.

1. **Clone the repo** or download it:
   ```bash
   git clone https://github.com/your-username/bitcoin-transaction-analyzer.git
   cd bitcoin-transaction-analyzer
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

---

## 🧪 Usage

Run the app:

```bash
node index.js
```

Sample output:

```
📊 ANALYTICS SUMMARY
Total Revenue: 15420.50
Most Sold Product: Game Coin

Transaction Counts by Category:
 - gaming: 3
 - hardware: 4
 - education: 3

🔍 Enter a category to export to CSV (or press Enter to skip): gaming
✅ CSV report saved to transactions_gaming.csv
```

Your report will be saved in the `reports/` directory (make sure it exists or is created automatically).

---

## 🧰 Dependencies

* [`random-generations`](https://www.npmjs.com/package/random-generations)
* [`fs`](https://nodejs.org/api/fs.html) – File system module (built-in)

---

## 📈 Example Enhancements

Looking to extend this project? Try adding:

* Category-wise revenue analysis
* Top N products
* Command-line arguments for automation
* Data storage (e.g., save to JSON, SQLite, MongoDB)

---

## 📄 License

MIT – Feel free to use, modify, and share.

---

## 👩🏽‍💻 Author

**Charity Gaya** – [LinkedIn](https://www.linkedin.com/in/charitygaya)

```
