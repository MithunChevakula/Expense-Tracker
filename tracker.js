document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-button');
    const totalIncomeElement = document.getElementById('totalIncome');
    const totalExpenseElement = document.getElementById('expense');
    const balanceElement = document.getElementById('balance');
    const transactionTable = document.querySelector('.transaction-table');

    let totalIncome = 0;
    let totalExpense = 0;

    addButton.addEventListener('click', function() {
        const dateInput = document.getElementById('dateInput').value;
        const amountInput = parseFloat(document.getElementById('amountInput').value);
        const transactionType = document.getElementById('transactionType').value;

        if (!dateInput || isNaN(amountInput) || transactionType === "Transaction Type") {
            alert("Please fill in all fields correctly.");
            return;
        }

        const newRow = transactionTable.insertRow();
        newRow.innerHTML = `
            <td>${amountInput.toFixed(2)}</td>
            <td>${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</td>
            <td>${dateInput}</td>
            <td>
                <button class="btn btn-sm delete-button">
                    <img src="./recycle-bin.png" alt="" width="35px">
                </button>
            </td>
        `;

        if (transactionType === "income") {
            totalIncome += amountInput;
        } else {
            totalExpense += amountInput;
        }

        updateTotals();
        clearInputs();

        newRow.querySelector('.delete-button').addEventListener('click', function() {
            if (transactionType === "income") {
                totalIncome -= amountInput;
            } else {
                totalExpense -= amountInput;
            }
            updateTotals();
            transactionTable.deleteRow(newRow.rowIndex);
        });
    });

    function updateTotals() {
        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalExpenseElement.textContent = totalExpense.toFixed(2);
        balanceElement.textContent = (totalIncome - totalExpense).toFixed(2);
    }

    function clearInputs() {
        document.getElementById('dateInput').value = '';
        document.getElementById('amountInput').value = '';
        document.getElementById('transactionType').selectedIndex = 0;
    }
});