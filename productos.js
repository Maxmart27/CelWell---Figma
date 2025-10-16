document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const productSections = document.querySelectorAll('.product-section');
    const productItems = document.querySelectorAll('.product-item');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        productSections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            const sectionItems = section.querySelectorAll('.product-item');
            let sectionVisible = false;

            sectionItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('h4, h5').textContent.toLowerCase();
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || sectionCategory === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    item.style.display = 'block';
                    sectionVisible = true;
                } else {
                    item.style.display = 'none';
                }
            });

            section.style.display = sectionVisible ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
});
