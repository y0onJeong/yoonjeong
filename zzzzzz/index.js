// script.js

// 1. 상품 데이터 (예시)
const products = [
    { id: 101, name: "시그니처 울 코트", category: "outer", price: 129000, image: "https://via.placeholder.com/250x300?text=Outer+Coat" },
    { id: 102, name: "오버핏 맨투맨 티셔츠", category: "top", price: 35000, image: "https://via.placeholder.com/250x300?text=Top+Tshirt" },
    { id: 103, name: "와이드 핏 데님 팬츠", category: "bottom", price: 49000, image: "https://via.placeholder.com/250x300?text=Bottom+Jeans" },
    { id: 104, name: "가을 니트 가디건", category: "outer", price: 78000, image: "https://via.placeholder.com/250x300?text=Outer+Knit" },
    { id: 105, name: "베이직 무지 티셔츠", category: "top", price: 19000, image: "https://via.placeholder.com/250x300?text=Top+Basic" },
];

const productListSection = document.getElementById('product-list');
const navLinks = document.querySelectorAll('.nav-link[data-category]');
const header = document.getElementById('main-header');

// 2. 상품 카드 생성 함수
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    const formattedPrice = product.price.toLocaleString('ko-KR'); 

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="card-info">
            <p class="name">${product.name}</p>
            <p class="price">${formattedPrice}원</p>
        </div>
    `;

    return card;
}

// 3. 상품 목록 렌더링 함수 (필터링)
function renderProducts(filterCategory) {
    productListSection.innerHTML = ''; 
    
    const filteredProducts = products.filter(product => 
        filterCategory === 'all' || product.category === filterCategory
    );

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productListSection.appendChild(card);
    });
}

// 4. 내비게이션 링크 클릭 이벤트 리스너 (카테고리 필터링)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Active 클래스 토글
        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');
        renderProducts(category || 'all');
    });
});


// 5. 스크롤 이벤트 핸들러 (헤더 색상 변경)
function handleScrollHeader() {
    // 스크롤 위치가 50px 이상일 때 클래스 추가
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleScrollHeader);


// 6. 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all'); // 기본적으로 'BEST'를 보여줍니다.
    handleScrollHeader(); // 로드 시 헤더 위치 확인
});