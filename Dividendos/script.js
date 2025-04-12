async function loadAndRenderStocks() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error("Error al cargar datos");
    const data = await response.json();
    renderStocks(data.stocks);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("stocksBody").innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #e74c3c;">
          Error al cargar los datos. Verifica el archivo data.json
        </td>
      </tr>
    `;
  }
}

function renderStocks(stocks) {
  const stocksBody = document.getElementById("stocksBody");
  let totalDividends = 0;
  let totalPortfolioValue = 0;
  let totalDividendYield = 0;

  stocksBody.innerHTML = stocks.map(stock => {
    const annualDividend = stock.shares * stock.dividend;
    const positionValue = stock.shares * stock.buyPrice;
    const dividendYield = (stock.dividend / stock.buyPrice * 100);
    const currencySymbol = getCurrencySymbol(stock.currency);

    totalDividends += annualDividend;
    totalPortfolioValue += positionValue;
    totalDividendYield += dividendYield;

    return `
      <tr data-country="${stock.country}" data-currency="${stock.currency}">
        <td>${stock.name} (${stock.ticker})</td>
        <td>${stock.country}</td>
        <td>${stock.shares}</td>
        <td>${currencySymbol}${stock.buyPrice.toFixed(2)}</td>
        <td>${currencySymbol}${annualDividend.toFixed(2)}</td>
        <td>${dividendYield.toFixed(2)}%</td>
      </tr>
    `;
  }).join("");

  // Actualizar resumen
  document.getElementById("annualDividends").textContent = `$${totalDividends.toFixed(2)}`;
  document.getElementById("portfolioValue").textContent = `$${totalPortfolioValue.toFixed(2)}`;
  document.getElementById("averageYield").textContent = `${(totalDividendYield / stocks.length).toFixed(2)}%`;
}

function getCurrencySymbol(currency) {
  const symbols = { 
    USD: "$", 
    EUR: "€", 
    CAD: "CA$", 
    NOK: "kr" 
  };
  return symbols[currency] || currency;
}

// Iniciar al cargar la página
document.addEventListener("DOMContentLoaded", loadAndRenderStocks);
