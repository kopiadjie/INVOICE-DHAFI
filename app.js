const itemsBody = document.querySelector("#invoice-items");
const addItemButton = document.querySelector("#add-item");
const discountInput = document.querySelector("#discount");
const invoiceNumberInput = document.querySelector("#invoice-number");
const customerInput = document.querySelector("#customer");
const brandLogo = document.querySelector("#brand-logo");
const defaultDocumentTitle = document.title;

brandLogo.addEventListener("error", () => {
  brandLogo.hidden = true;
});
if (brandLogo.complete && brandLogo.naturalWidth === 0) {
  brandLogo.hidden = true;
}

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatRupiah(amount) {
  return rupiah.format(amount).replace(/\u00a0/g, "\u00a0");
}

function updateTotals() {
  let subtotal = 0;

  for (const row of itemsBody.rows) {
    const price = Number(row.querySelector(".price-input").value) || 0;
    const quantity = Number(row.querySelector(".qty-input").value) || 0;
    const amount = price * quantity;

    subtotal += amount;
    row.querySelector(".line-amount").textContent = formatRupiah(amount);
  }

  const discount = Math.max(0, Number(discountInput.value) || 0);
  const total = Math.max(0, subtotal - discount);

  document.querySelector("#subtotal").textContent = formatRupiah(subtotal);
  document.querySelector("#total").textContent = formatRupiah(total);
  document.querySelector("#amount-due").textContent = formatRupiah(total);
}

function addItem() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <input class="item-input" type="text" name="item" placeholder="Nama item" aria-label="Nama item" />
    </td>
    <td>
      <input class="number-input qty-input" type="number" name="quantity" min="0" step="1" value="1" inputmode="numeric" aria-label="Kuantitas" />
    </td>
    <td>
      <input class="number-input price-input" type="number" name="price" min="0" step="1" placeholder="0" inputmode="numeric" aria-label="Harga dalam rupiah" />
    </td>
    <td><span class="line-amount">${formatRupiah(0)}</span></td>
    <td>
      <button class="remove-item no-print" type="button" aria-label="Hapus item">&times;</button>
    </td>
  `;

  row.addEventListener("input", updateTotals);
  row.querySelector(".remove-item").addEventListener("click", () => {
    row.remove();
    updateTotals();
  });
  itemsBody.append(row);
  updateTotals();
  row.querySelector(".item-input").focus();
}

addItemButton.addEventListener("click", addItem);
discountInput.addEventListener("input", updateTotals);
invoiceNumberInput.addEventListener("input", () => {
  invoiceNumberInput.value = invoiceNumberInput.value.replace(/\D/g, "").slice(0, 4);
});
document.querySelector("#print-invoice").addEventListener("click", () => {
  if (!invoiceNumberInput.reportValidity()) {
    return;
  }

  const customerName = customerInput.value
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/[. ]+$/g, "");
  const filenameParts = [invoiceNumberInput.value, customerName, "dikit dikit visual"]
    .filter(Boolean);

  document.title = filenameParts.join(" ");
  window.print();
});
window.addEventListener("afterprint", () => {
  document.title = defaultDocumentTitle;
});

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10);
document.querySelector("#invoice-date").value = localToday;

addItem();
