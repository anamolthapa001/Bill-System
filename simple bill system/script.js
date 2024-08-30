// script.js
function calculateBill() {
    let oldReading = parseInt(document.getElementById('oldReading').value);
    let newReading = parseInt(document.getElementById('newReading').value);
    let oldDue = parseFloat(document.getElementById('oldDue').value) || 0;
    let paymentMethod = document.getElementById('paymentMethod').value;
    let currentDate = new Date().toLocaleDateString();

    // Calculate payment deadline (e.g., 15 days from the current date)
    let paymentDeadline = new Date();
    paymentDeadline.setDate(paymentDeadline.getDate() + 15);
    let formattedDeadline = paymentDeadline.toLocaleDateString();

    if (isNaN(oldReading) || isNaN(newReading) || newReading < oldReading) {
        document.getElementById('result').innerText = "Please enter valid readings.";
        return;
    }

    let units = newReading - oldReading;
    let bill = 0;

    if (units <= 20) {
        bill = units * 4;
    } else if (units <= 50) {
        bill = (20 * 4) + ((units - 20) * 7);
    } else if (units <= 150) {
        bill = (20 * 4) + (30 * 7) + ((units - 50) * 9.5);
    } else {
        bill = (20 * 4) + (30 * 7) + (100 * 9.5) + ((units - 150) * 11);
    }

    let totalAmount = bill + oldDue;
    let resultText = `Your Bill for ${units} units is: Rs ${bill.toFixed(2)}\nTotal Amount to Pay: Rs ${totalAmount.toFixed(2)}`;
    document.getElementById('result').innerText = resultText;

    generateInvoice(oldReading, newReading, units, bill, oldDue, totalAmount, paymentMethod, currentDate, formattedDeadline);
}

function generateInvoice(oldReading, newReading, units, bill, oldDue, totalAmount, paymentMethod, currentDate, formattedDeadline) {
    let invoiceDiv = document.getElementById('invoice');
    invoiceDiv.innerHTML = `
        <h3>Bill Invoice</h3>
        <img src="logo.png" alt="NEA Logo" class="logo" width="90px" height="90px"> <br>
        <p><strong>Date:</strong> ${currentDate}</p> 
        <p><strong>Old Reading:</strong> ${oldReading} units</p> 
        <p><strong>New Reading:</strong> ${newReading} units</p>
        <p><strong>Units Consumed:</strong> ${units} units</p>
        <p><strong>Current Bill:</strong> Rs ${bill.toFixed(2)}</p>
        <p><strong>Old Due:</strong> Rs ${oldDue.toFixed(2)}</p>
        <p><strong>Total Amount to Pay:</strong> Rs ${totalAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Payment Deadline:</strong> ${formattedDeadline}</p>
        <div class="signature"> <br><br>
            <p><strong>Authorized Signature:</strong></p>
            <p>________________________</p>
        </div>
    `;
    invoiceDiv.style.display = 'block';
    document.getElementById('printButton').style.display = 'block';
}

function printInvoice() {
    window.print();
}
