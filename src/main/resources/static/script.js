const API = "/api/accounts";//alink  btwn api and frontend


let accounts = [];


/* =========================
   LOAD ACCOUNTS
========================= */

async function loadAccounts() {

    try {

        const response = await fetch(API + "/details");//fetch to call rest api

        if (!response.ok) {
            throw new Error("Unable to load accounts");
        }

        accounts = await response.json();

        renderAccounts();
        updateStatistics();
        populateAccountSelect();

    } catch (error) {

        console.error("Error loading accounts:", error);

    }
}


/* =========================
   RENDER ACCOUNT TABLE
========================= */

function renderAccounts() {

    const tbody =
        document.getElementById("accountTableBody");

    tbody.innerHTML = "";


    if (accounts.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;padding:30px;">
                    No accounts available
                </td>
            </tr>
        `;

        return;
    }


    accounts.forEach(account => {

        const customerName =
            account.customerName || "Unknown Customer";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <span class="account-number">
                    #${account.accountId}
                </span>
            </td>

            <td>
                <span
                    class="customer-link"
                    onclick='showCustomerDetails(${JSON.stringify(account)})'
                >
                    ${customerName}
                </span>
            </td>

            <td>
                ${account.branchName || "—"}
            </td>

            <td>
                <span class="balance">
                    ${formatCurrency(account.balance)}
                </span>
            </td>

            <td>
                <span class="status">
                    Active
                </span>
            </td>

            <td>
                <button
                    class="delete-button"
                    onclick="deleteAccount(${account.accountId})"
                >
                    Delete
                </button>
            </td>

        `;


        tbody.appendChild(row);

    });


    document.getElementById("tableCount").textContent =
        `${accounts.length} account${accounts.length === 1 ? "" : "s"}`;
}


/* =========================
   UPDATE DASHBOARD STATISTICS
========================= */

function updateStatistics() {

    const totalBalance =
        accounts.reduce(
            (sum, account) =>
                sum + Number(account.balance || 0),
            0
        );


    const averageBalance =
        accounts.length > 0
            ? totalBalance / accounts.length
            : 0;


    document.getElementById("totalBalance").textContent =
        formatCurrency(totalBalance);


    document.getElementById("accountCount").textContent =
        `${accounts.length} account${accounts.length === 1 ? "" : "s"}`;


    document.getElementById("statAccounts").textContent =
        accounts.length;


    document.getElementById("statDeposits").textContent =
        formatCurrency(totalBalance);


    document.getElementById("statAverage").textContent =
        formatCurrency(averageBalance);

}


/* =========================
   ACCOUNT DROPDOWNS
========================= */

function populateAccountSelect() {

    const depositSelect =
        document.getElementById("depositAccount");

    const withdrawSelect =
        document.getElementById("withdrawAccount");


    depositSelect.innerHTML =
        `<option value="">Select account</option>`;

    withdrawSelect.innerHTML =
        `<option value="">Select account</option>`;


    accounts.forEach(account => {

        const customer =
            account.customerName || "Customer";


        const optionText =
            `#${account.accountId} — ${customer}`;


        const depositOption =
            document.createElement("option");

        depositOption.value =
            account.accountId;

        depositOption.textContent =
            optionText;

        depositSelect.appendChild(
            depositOption
        );


        const withdrawOption =
            document.createElement("option");

        withdrawOption.value =
            account.accountId;

        withdrawOption.textContent =
            optionText;

        withdrawSelect.appendChild(
            withdrawOption
        );

    });

}


/* =========================
   DEPOSIT
========================= */

async function deposit() {

    const accountId =
        document.getElementById(
            "depositAccount"
        ).value;


    const amount =
        document.getElementById(
            "depositAmount"
        ).value;


    if (!accountId) {

        alert("Please select an account.");

        return;
    }


    if (!amount || Number(amount) <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/${accountId}/deposit?amount=${amount}`,
                {
                    method: "POST"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Deposit failed:",
                errorText
            );

            alert("Deposit failed.");

            return;
        }


        document.getElementById(
            "depositAmount"
        ).value = "";


        document.getElementById(
            "depositAccount"
        ).value = "";


        await loadAccounts();


    } catch (error) {

        console.error(
            "Deposit error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

}


/* =========================
   WITHDRAW
========================= */

async function withdraw() {

    const accountId =
        document.getElementById(
            "withdrawAccount"
        ).value;


    const amount =
        document.getElementById(
            "withdrawAmount"
        ).value;


    if (!accountId) {

        alert("Please select an account.");

        return;
    }


    if (!amount || Number(amount) <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/${accountId}/withdraw?amount=${amount}`,
                {
                    method: "POST"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Withdrawal failed:",
                errorText
            );

            alert("Withdrawal failed.");

            return;
        }


        document.getElementById(
            "withdrawAmount"
        ).value = "";


        document.getElementById(
            "withdrawAccount"
        ).value = "";


        await loadAccounts();


    } catch (error) {

        console.error(
            "Withdrawal error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

}


/* =========================
   DELETE ACCOUNT
========================= */

async function deleteAccount(accountId) {
    try {
        const response = await fetch(`${API}/${accountId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete account");
        }

        alert("Account deleted successfully");

        await loadAccounts();

    } catch (error) {
        console.error(error);
        alert("Error deleting account");
    }
}
/* =========================
   CUSTOMER DETAILS
========================= */

function showCustomerDetails(account) {

    const customerName =
        account.customerName ||
        "Customer";


    document.getElementById(
        "modalAvatar"
    ).textContent =
        customerName
            .charAt(0)
            .toUpperCase();


    document.getElementById(
        "modalCustomerName"
    ).textContent =
        customerName;


    document.getElementById(
        "modalAccountNumber"
    ).textContent =
        `Account #${account.accountId}`;


    document.getElementById(
        "modalBalance"
    ).textContent =
        formatCurrency(
            account.balance
        );


    document.getElementById(
        "modalId"
    ).textContent =
        account.accountId;


    document.getElementById(
        "modalCustomer"
    ).textContent =
        customerName;


    document.getElementById(
        "modalBranch"
    ).textContent =
        account.branchName || "—";


    document.getElementById(
        "modalCity"
    ).textContent =
        account.branchCity || "—";


    document.getElementById(
        "detailsModal"
    ).classList.add("show");

}


/* =========================
   CLOSE CUSTOMER MODAL
========================= */

function closeDetailsModal() {

    document.getElementById(
        "detailsModal"
    ).classList.remove("show");

}


/* =========================
   OPEN ADD ACCOUNT POPUP
========================= */

function openAddModal() {

    document.getElementById(
        "addModal"
    ).classList.add("show");

}


/* =========================
   CLOSE ADD ACCOUNT POPUP
========================= */

function closeAddModal() {

    document.getElementById(
        "addModal"
    ).classList.remove("show");

}


/* =========================
   ADD ACCOUNT
========================= */

async function addAccount() {

    const customerName =
        document.getElementById(
            "newCustomerName"
        ).value.trim();


    const customerId =
        document.getElementById(
            "newCustomerId"
        ).value;


    const branchName =
        document.getElementById(
            "newBranchName"
        ).value.trim();


    const balance =
        document.getElementById(
            "newBalance"
        ).value;


    if (!customerName) {

        alert("Please enter customer name.");

        return;
    }


    if (!customerId) {

        alert("Please enter customer ID.");

        return;
    }


    if (!branchName) {

        alert("Please enter branch name.");

        return;
    }


    if (
        balance === "" ||
        Number(balance) < 0
    ) {

        alert("Please enter a valid opening balance.");

        return;
    }


    const url =
        `${API}?customerId=${encodeURIComponent(customerId)}` +
        `&customerName=${encodeURIComponent(customerName)}` +
        `&branchName=${encodeURIComponent(branchName)}` +
        `&balance=${encodeURIComponent(balance)}`;


    try {

        const response =
            await fetch(
                url,
                {
                    method: "POST"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Account creation failed:",
                errorText
            );


            alert(
                "Unable to create account."
            );

            return;
        }


        /* Clear form */

        document.getElementById(
            "newCustomerName"
        ).value = "";


        document.getElementById(
            "newCustomerId"
        ).value = "";


        document.getElementById(
            "newBranchName"
        ).value = "";


        document.getElementById(
            "newBalance"
        ).value = "";


        /* Close popup */

        closeAddModal();


        /* Reload dashboard */

        await loadAccounts();


        alert(
            "Account created successfully."
        );


    } catch (error) {

        console.error(
            "Account creation error:",
            error
        );


        alert(
            "Unable to connect to the server."
        );

    }

}


/* =========================
   FIND ACCOUNTS ABOVE AMOUNT
========================= */

function findAccountsAboveAmount() {

    const amountInput =
        document.getElementById(
            "amountFilter"
        );


    const container =
        document.getElementById(
            "averageContainer"
        );


    const amount =
        Number(amountInput.value);


    container.innerHTML = "";


    if (
        amountInput.value === "" ||
        amount < 0
    ) {

        container.innerHTML = `
            <div class="average-card">

                <span>SEARCH</span>

                <h3>
                    Enter a valid amount
                </h3>

                <strong>
                    —
                </strong>

            </div>
        `;

        return;
    }


    /*
       Find accounts whose balance
       is greater than the entered amount.
    */

    const filteredAccounts =
        accounts.filter(
            account =>
                Number(account.balance) > amount
        );


    if (
        filteredAccounts.length === 0
    ) {

        container.innerHTML = `
            <div class="average-card">

                <span>SEARCH RESULT</span>

                <h3>
                    No accounts found
                </h3>

                <strong>
                    Above ${formatCurrency(amount)}
                </strong>

            </div>
        `;

        return;
    }


    filteredAccounts.forEach(
        account => {

            const card =
                document.createElement("div");


            card.className =
                "average-card";


            card.innerHTML = `

                <span>
                    ACCOUNT #${account.accountId}
                </span>

                <h3>
                    ${account.customerName || "Customer"}
                </h3>

                <strong>
                    ${formatCurrency(account.balance)}
                </strong>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================
   FORMAT CURRENCY
========================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    ).format(
        Number(value || 0)
    );

}


/* =========================
   CLOSE MODALS WHEN
   CLICKING OUTSIDE
========================= */

window.addEventListener(
    "click",
    function(event) {

        const detailsModal =
            document.getElementById(
                "detailsModal"
            );


        const addModal =
            document.getElementById(
                "addModal"
            );


        if (
            event.target === detailsModal
        ) {

            closeDetailsModal();

        }


        if (
            event.target === addModal
        ) {

            closeAddModal();

        }

    }
);


/* =========================
   ESC KEY CLOSES MODALS
========================= */

window.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }


        closeDetailsModal();
        closeAddModal();

    }
);


/* =========================
   AUTO REFRESH
========================= */

setInterval(
    function() {

        loadAccounts();

    },
    15000
);


/* =========================
   START APPLICATION
========================= */

loadAccounts();