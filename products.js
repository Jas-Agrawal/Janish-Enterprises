function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}





const grid = document.getElementById('productGrid');

// Updated Display Function: Added onclick="openModal(${product.id})"
function displayProducts(items) {
    grid.innerHTML = items.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="price">Rs ${product.price.toLocaleString('en-IN')}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); sendToInquiry('${product.name}')">Send Inquiry</button>
            </div>
        </div>
    `).join('');
}

// Modal Logic
function openModal(id) {
    const product = productData.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalName').innerText = product.name;
    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalCategory').innerText = product.category;
    document.getElementById('modalDesc').innerText = product.description;
    document.getElementById('modalPrice').innerText = "Rs " + product.price.toLocaleString('en-IN');

    document.getElementById('productModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// Close modal if user clicks outside the box
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeModal();
    }
}
// Initial display
displayProducts(productData);

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = productData.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );
    displayProducts(filtered);
}

function filterCategory(cat) {
    // Update active button UI
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if(cat === 'all') {
        displayProducts(productData);
    } else {
        const filtered = productData.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}







// Initialize inquiry list from localStorage or empty array
let inquiryCart = JSON.parse(localStorage.getItem('userInquiries')) || [];

function sendToInquiry(productName) {
    // Check if product is already in the list to avoid duplicates
    if (!inquiryCart.includes(productName)) {
        inquiryCart.push(productName);
        // Save to browser memory
        localStorage.setItem('userInquiries', JSON.stringify(inquiryCart));
        
        // Visual feedback
        alert(`${productName} added to your inquiry list!`);
        updateInquiryCount();
    } else {
        alert("This item is already in your inquiry list.");
    }
}

// Optional: Update a counter in the UI (if you add a badge to your navbar)
function updateInquiryCount() {
    const count = inquiryCart.length;
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = count;
}

// Call on page load
updateInquiryCount();
