document.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
  const apiUrl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"; 

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
        console.log(data)
        displayTabs(data);
        displayData(data.categories[0].category_products); 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayTabs(data) {
    const tabContainer = document.getElementById("tab-container");
    data.categories.forEach((category, index) => {
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-btn");
        tabContainer.appendChild(tabButton);

        tabButton.textContent = category.category_name;

        tabButton.addEventListener("click", () => {
            const selectedCategoryProducts = category.category_products;
            displayData(selectedCategoryProducts);
            const tabButtons = document.querySelectorAll(".tab-btn");
            tabButtons.forEach(button => {
                button.style.backgroundColor = "#F2F2F2";
                button.style.color = "black";
                const icon = button.querySelector(".iconshumans");
                if (icon) {
                    icon.remove();
                }
            });

            const icon = document.createElement("img");
            icon.classList.add("iconshumans");
            let iconSource = "";
            if (category.category_name === "Men") {
                iconSource = "Vectormen.png";
                tabButton.style.backgroundColor = "black";
                tabButton.style.color = "white";
            } else if (category.category_name === "Women") {
                iconSource = "vectorWomen.png";
            } else {
                iconSource = "VectorKids.png";
            }
            icon.src = iconSource;
            tabButton.prepend(icon);

            tabButton.style.backgroundColor = "black";
            tabButton.style.color = "white";
        });

        if (index === 0) {
            tabButton.style.backgroundColor = "black";
            tabButton.style.color = "white";

            const icon = document.createElement("img");
            icon.classList.add("iconshumans");
            icon.src = "Vectormen.png";
            tabButton.prepend(icon);
        }
    });
}

function calculateDiscountPercentage(originalPrice, discountedPrice) {
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discountPercentage.toFixed(2);
}

function badgeCalc(badge_text) {
    if (badge_text !== null) {
        return `<p class="badge">${badge_text}</p>`;
    } else {
        return "";
    }
}

function displayData(selectedCategoryProducts) {
    const dataContainer = document.getElementById("data");
    dataContainer.innerHTML = ""; 

    const category = selectedCategoryProducts;
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("category");
    
    const productListElement = document.createElement("ul");
    productListElement.classList.add("product-list");
 
    category.forEach(product => {
        const productItemElement = document.createElement("li");
        productItemElement.classList.add("product-item");

        productItemElement.innerHTML = `
            <div class="carousel">
                <div class="image-container">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                    <img class="product-image" src="${product.second_image}" alt="${product.title}" style="display: none;">
                    ${badgeCalc(product.badge_text)}
                </div>

                <div class="title">
                    <p class="product-title">${product.title}</p>
                    <p class="dot"> &#8226</p>
                    <p>${product.vendor}</p>
                </div>
                <div class="price-container">
                    <p class="actual-price">Rs. ${product.price}.00</p>
                    <p class="compare-price"> ${product.compare_at_price}.00</p>
                    <p class="discount">${calculateDiscountPercentage(product.compare_at_price, product.price)}% Off</p>
                </div>        
                <button class="button">Add to Cart</button>
            </div>`;
        productListElement.appendChild(productItemElement);
    });
      
    categoryElement.appendChild(productListElement);
    dataContainer.appendChild(categoryElement);
  
   
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.image-container img');
        let currentImageIndex = 0;
        const nextImage = () => {
            images[currentImageIndex].style.display = 'none';
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].style.display = 'block';
        };
        setInterval(nextImage, 3000); 
    });
}

