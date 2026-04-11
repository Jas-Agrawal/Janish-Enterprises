function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}







function loadInquiries() {
    const listContainer = document.getElementById('inquiryList');
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    
    if (items.length === 0) {
        listContainer.innerHTML = "<p style='text-align:center; padding: 20px;'>Your list is empty. Go back to products to add some!</p>";
        return;
    }

    // Generate the list with a Remove (X) button for each item
    listContainer.innerHTML = items.map((item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee;">
            <span style="font-weight: 500;">${item}</span>
            <button onclick="removeItem(${index})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                <i class="fas fa-times"></i> Remove
            </button>
        </div>
    `).join('');
}


function removeItem(index) {
    // 1. Get the current list
    let items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    
    // 2. Remove the item at the specific index
    items.splice(index, 1);
    
    // 3. Save the updated list back to LocalStorage
    localStorage.setItem('userInquiries', JSON.stringify(items));
    
    // 4. Refresh the list on the screen
    loadInquiries();
    
    // 5. Update the navbar count (if applicable)
    updateInquiryCount(); 
}