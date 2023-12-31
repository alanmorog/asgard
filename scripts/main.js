

//mercadopago---------------------------




const mp = new MercadoPago('APP_USR-6c25f546-9cc4-4e74-b33f-3b196e1a05fb', {
  locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const orderData = {
      title: document.querySelector(".name").innerText,
      quantity: 1,
      price: 10,
    };

    const response = await fetch("https://alanmorog.github.io/asgard/create_preference", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const preference = await response.json();
    createCheckoutButton(preference.id);
  } catch (error) {
    alert("error :(");
  }
});

//create boton de  mercadopago

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };
  renderComponent();
};