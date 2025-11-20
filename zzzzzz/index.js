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

// ⭐ 장바구니 관련 변수 및 DOM 요소 정의 (추가) ⭐
let cart = JSON.parse(localStorage.getItem('cartItems')) || []; // 로컬 스토리지에서 장바구니 불러오기
const cartModal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const closeButton = document.querySelector('.close-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count')

// 2. 상품 카드 생성 함수 (수정: 장바구니 버튼 및 이벤트 리스너 추가)
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
        <button class="add-to-cart-btn" data-product-id="${product.id}">장바구니 담기</button>
    `;

    // ⭐ 장바구니 담기 버튼에 이벤트 리스너 추가 ⭐
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
    });

    return card;
}


// 3. 상품 목록 렌더링 함수 (기존과 동일)
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

// ⭐ 장바구니 핵심 로직 (추가) ⭐

// A. 로컬 스토리지 업데이트 및 카운트 갱신
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function updateCartDisplay() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

// B. 장바구니에 상품 추가
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productToAdd.id, 
            name: productToAdd.name, 
            price: productToAdd.price, 
            quantity: 1 
        });
    }
    
    updateLocalStorage();
    updateCartDisplay();
    alert(`${productToAdd.name}이(가) 장바구니에 담겼습니다.`);
}

// C. 장바구니에서 상품 삭제
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateLocalStorage();
    updateCartDisplay();
    renderCartModal(); // 모달 내용을 즉시 갱신
}

// D. 장바구니 모달 렌더링
function renderCartModal() {
    cartItemsContainer.innerHTML = ''; // 초기화
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
                <p>합계: ${itemTotal.toLocaleString()}원</p>
                <button class="remove-btn" data-id="${item.id}">삭제</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }
    
    cartTotalElement.textContent = total.toLocaleString('ko-KR');
    
    // 삭제 버튼 이벤트 리스너 설정
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idToRemove = parseInt(this.getAttribute('data-id'));
            removeFromCart(idToRemove);
        });
    });
}

// E. 모달 열기/닫기 이벤트 설정
cartButton.addEventListener('click', () => {
    renderCartModal(); // 모달 열 때마다 최신 데이터로 렌더링
    cartModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});


// 6. 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all'); // 기본적으로 'BEST'를 보여줍니다.
    handleScrollHeader(); // 로드 시 헤더 위치 확인
});